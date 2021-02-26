const healthHandler = async (req, res) => {
  res.status(200).send("Server up now!");
};

module.exports = {healthHandler};
  