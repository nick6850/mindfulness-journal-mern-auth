const RecordRouter = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

const getAllRecords = require("../controllers/recordController");

RecordRouter.get("/", authMiddleware, getAllRecords);

// RecordRouter.post("/", createRecord);

// RecordRouter.put("/:id", editRecord);

// RecordRouter.delete("/:id", deleteRecord);

module.exports = RecordRouter;
