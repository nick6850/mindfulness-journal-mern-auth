const RecordRouter = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllRecords,
  createRecord,
  editRecord,
  deleteRecord,
} = require("../controllers/recordController");

RecordRouter.get("/", authMiddleware, getAllRecords);

RecordRouter.post("/", authMiddleware, createRecord);

RecordRouter.put("/:id", authMiddleware, editRecord);

RecordRouter.delete("/:id", authMiddleware, deleteRecord);

module.exports = RecordRouter;
