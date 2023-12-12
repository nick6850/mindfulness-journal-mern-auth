const UserRouter = require("express").Router();
const { login, register } = require("../controllers/userController");
const registrationMiddleware = require("../middleware/registrationMiddleware");

UserRouter.post("/login", login);
UserRouter.post("/register", registrationMiddleware, register);

module.exports = UserRouter;
