const Record = require("../models/recordModel");

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user });
    res.status(200).json(records);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createRecord = async (req, res) => {
  const { recordDate, title, content, mood, tags } = req.body;

  if (!recordDate || !title || !content || !mood || !tags) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  try {
    const newRecord = await Record.create({ ...req.body, user: req.user });
    res.status(200).json(newRecord);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const editRecord = async (req, res) => {
  const _id = req.params.id;
  try {
    const record = await Record.findOne({ user: req.user, _id });
    if (!record) {
      throw new Error("The record doesn't exist");
    }

    await Record.findByIdAndUpdate({ _id }, { ...req.body });
    const updatedRecord = await Record.findOne({ user: req.user, _id });

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteRecord = async (req, res) => {
  const _id = req.params.id;
  try {
    const record = await Record.findOne({ user: req.user, _id });
    if (!record) {
      throw new Error("The record doesn't exist");
    }

    const deletedRecord = await Record.findByIdAndDelete({ _id });

    res.status(200).json(deletedRecord);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllRecords, createRecord, editRecord, deleteRecord };
