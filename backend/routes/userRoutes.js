const { Router } = require("express");
const { login, register } = require("../controllers/userController");

const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/register", register);

module.exports = UserRouter;
