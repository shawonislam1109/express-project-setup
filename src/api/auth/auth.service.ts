import User, { IUser } from "../../models/user.model";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError";

/**
 * Register a new user
 * @param name
 * @param email
 * @param password
 * @returns
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError(400, "Email already taken");
  }
  const user = await User.create({ name, email, password });
  return user;
};

/**
 * Login user with email and password
 * @param email
 * @param password
 * @returns
 */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }
  return user;
};

/**
 * Generate authentication tokens for a user
 * @param user
 * @returns
 */
export const generateAuthTokens = async (user: IUser) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

/**
 * Refresh authentication tokens
 * @param refreshToken
 * @returns
 */
export const refreshAuthTokens = async (refreshToken: string) => {
  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    );
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(403, "Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );

    return { accessToken };
  } catch (error) {
    throw new ApiError(403, "Invalid refresh token");
  }
};

/**
 * Logout user by invalidating refresh token
 * @param refreshToken
 */
export const logout = async (refreshToken: string) => {
  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }
};
