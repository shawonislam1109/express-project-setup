const getUsers = async (req, res) => {
  res.json({ message: "Get all users" });
};

module.exports = {
  getUsers,
};
