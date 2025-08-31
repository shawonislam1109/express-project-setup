const User = require('./user.model');

const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
    throw new Error('Email already taken');
  }
  const user = new User(userData);
  await user.save();
  return user;
};

const updateUser = async (userId, userData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (userData.email && (await User.isEmailTaken(userData.email, userId))) {
    throw new Error('Email already taken');
  }
  Object.assign(user, userData);
  await user.save();
  return user;
};

module.exports = {
  createUser,
  updateUser,
};
