const { testSQL } = require("../models/test/test.queries.sql");

const testController = async (req, res) => {
  const data = await testSQL();
  return res.status(200).send(data);
};

module.exports = {
  testController,
};
