const User = require("../users/user.model");
const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/ApiError");

const registerUser = async (name, email, password) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError(400, "Email already taken");
  }
  const user = await User.create({ name, email, password });
  return user;
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }
  return user;
};

const generateAuthTokens = async (user) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const refreshAuthTokens = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(403, "Invalid refresh token");
    }

    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return { accessToken };
  } catch (error) {
    throw new ApiError(403, "Invalid refresh token");
  }
};

const logout = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }
};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
  generateAuthTokens,
  refreshAuthTokens,
  logout,
};
