const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization.startsWith("Bearer")) {
      throw new Error("Wrong credentials");
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      throw new Error("Wrong credentials");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Wrong credentials" });
  }
};

module.exports = authMiddleware;
