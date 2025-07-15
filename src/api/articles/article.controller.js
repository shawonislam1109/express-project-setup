const getArticles = async (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you can see the articles` });
};

module.exports = {
  getArticles,
};
