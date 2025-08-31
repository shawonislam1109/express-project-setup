const userService = require('./user.service');

const getUsers = async (req, res) => {
  res.json({ message: "Get all users" });
};

const getUserById = async (req, res) => {
  res.json({ message: `Get user with id ${req.params.id}` });
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
