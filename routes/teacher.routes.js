const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/User");
const Teacher = require("../models/Teacher");

const router = Router();

// api/teacher/users
router.get('/users', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const teacher = await Teacher.findById(userId);
    if (!teacher)
      return res.status(400).json({ message: "Permission denied" });

    const users = await User.find();

    res.json({ users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
