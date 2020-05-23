const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
require("dotenv").config();

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некоректний email").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
    check("name", "Мінімальна довжина імені 1 символ").isLength({
      min: 1,
    }),
    check("surname", "Мінімальна довжина прізвища 1 символ").isLength({
      min: 1,
    }),
    check("isTeacher", "WTF").isBoolean()
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

      const { email, password, name, surname, isTeacher } = req.body;

      const candidate = (await User.findOne({ email })) || (await Teacher.findOne({ email }));

      if (candidate) {
        return res.status(400).json({ message: "Такий користувач вже існує" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      if (!isTeacher)
      {
        const user = new User({
          email,
          password: hashedPassword,
          name,
          surname,
        });

        await user.save();

        res.status(201).json({ message: "Користувач створений" });
      }

      else
      {
        const teacher = new Teacher({
          email,
          password: hashedPassword,
          name,
          surname,
        });

        await teacher.save();

        res.status(201).json({ message: "Викладач створений" });
      }

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

      let isTeacher = null;
      let user = await User.findOne({ email });
      if (user)
      {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Неправильний пароль" });
        }

        isTeacher = false;
      }
      else
      {
        user = await Teacher.findOne({ email });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res.status(400).json({message: "Неправильний пароль"});
          }

          isTeacher = true;
        }
      }

      if (isTeacher === null)
        return res.status(400).json({ message: "Користувача не знайдено" });
      else
      {
        const token = jwt.sign({ userId: user.id, isTeacher }, process.env.jwtSecret, {
          expiresIn: "2h",
        });

        res.json({ token, userId: user.id, isTeacher });
      }

    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
