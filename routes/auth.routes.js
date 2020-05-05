const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();
require("dotenv").config();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некоректний email").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      console.log("Body:", req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Введені некоректні дані",
        });
      }

      const email = req.body.email;
      const password = req.body.password;
      const name = req.body.name;
      const surname = req.body.surname;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Такий користувач вже існує" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
        name,
        surname,
      });

      await user.save();

      res.status(201).json({ message: "Користувач створений" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Некоректний email").normalizeEmail().isEmail(),
    check("password", "Неправильний пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Введені некоректні дані",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неправильний пароль" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.jwtSecret, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
