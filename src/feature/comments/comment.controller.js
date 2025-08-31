const getComments = async (req, res) => {
  res.json({ message: "Get all comments" });
};

module.exports = {
  getComments,
};
