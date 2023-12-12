const validator = require("validator");
const bcrypt = require("bcrypt");

const registrationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw new Error("Email is invalid");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong");
    }

    req.hashedPassword = await bcrypt.hash(password, 10);
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = registrationMiddleware;
