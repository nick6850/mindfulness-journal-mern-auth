const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const UserRouter = require("./routes/userRoutes");
const app = express();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_API)
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(port, console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err.message));

app.use("users", UserRouter);
