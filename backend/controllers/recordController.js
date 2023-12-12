const Record = require("../models/recordModel");

const getAllRecords = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = getAllRecords;
