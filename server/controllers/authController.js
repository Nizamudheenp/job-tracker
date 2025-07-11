const UserDB = require('../models/userModel');
const bcrypt = require('bcryptjs');
const webToken = require('../utils/webtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.json({ message: "All feilds are required" });
        }
        const userExists = await UserDB.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserDB.create({
            name,
            email,
            password: hashedPassword
        });
        const token = webToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserDB.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = webToken(user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};