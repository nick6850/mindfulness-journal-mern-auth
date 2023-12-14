const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email } = req.body;
  const hashedPassword = req.hashedPassword;
  try {
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      _id: newUser._id,
      email,
      hashedPassword,
      token: createToken(newUser._id),
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      throw new Error("Wrong credentials");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      return res
        .status(200)
        .json({ message: "Success", token: createToken(user._id) });
    }
    throw new Error("Wrong credentials");
  } catch (err) {
    console.log(err);
    return res.status(401).json("Wrong credentials");
  }
};

function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
}

module.exports = { login, register };
