const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    const newuser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpass,
    });
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    !user && res.status(400).json("Wrong Credential!!!!");
    const validate = await bcrypt.compare(req.body.password, user.password);

    !validate && res.status(400).json("Wrong Password!!!!");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
