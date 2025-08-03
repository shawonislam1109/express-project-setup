import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

/**
 * Register a new user
 * @param req
 * @param res
 * @param next
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user with email and password
 * @param req
 * @param res
 * @param next
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await authService.generateAuthTokens(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh authentication tokens
 * @param req
 * @param res
 * @param next
 */
export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  try {
    const tokens = await authService.refreshAuthTokens(refreshToken);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user by invalidating refresh token
 * @param req
 * @param res
 * @param next
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  try {
    await authService.logout(refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
