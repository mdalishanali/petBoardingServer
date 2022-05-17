const authorization = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).send({ message: "Only Admin Can Access this Page" });
  }
  next();
};

module.exports = authorization;
