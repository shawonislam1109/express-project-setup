const authService = require("./auth.service");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await authService.generateAuthTokens(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    const tokens = await authService.refreshAuthTokens(refreshToken);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;
  try {
    await authService.logout(refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshTokens,
  logout,
};
