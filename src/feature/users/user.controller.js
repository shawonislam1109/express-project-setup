import * as userService from './user.service.js';

export const getUsers = async (req, res) => {
  res.json({ message: "Get all users" });
};

export const getUserById = async (req, res) => {
  res.json({ message: `Get user with id ${req.params.id}` });
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};