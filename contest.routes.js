const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Contest = require("../models/Contest");
const { ObjectId } = require("mongoose").Types;

const router = Router();

// /api/contest/create
router.post("/create",
    [
      check("name", "Мінімальна довжина поля 1 символ").isLength({
        min: 1,
      }),
      check("tasks", "Мінімальна довжина поля 1 символ").isLength({
        min: 1,
      }),
      check("answers", "Мінімальна довжина поля 1 символ").isLength({
        min: 1,
      }),
    ],
    auth, async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Введені некоректні дані",
        });
      }

      const { userId, isTeacher } = req.user;
      const { name, tasks, answers } = req.body;

      try {
        const teacher = await Teacher.findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Invalid data" });
      };

      if (!teacher)
        return res.status(400).json({ message: "Викладача не знайдено" });

      if (tasks.length !== answers.length)
        return res.status(400).json({ message: "Invalid data" });

      const contest = new Contest({
        teacher: userId,
        name,
        students: [],
        answers,
        tasks,
      });

      teacher.contests.push(contest._id);

      await teacher.save();
      await contest.save();

      res.status(201).json({ message: "Контест створений", contestId: contest._id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong, try again" });
    }
});

// /api/contest/index
router.get("/index", auth, async (req, res) => {
  try {
    const { userId, isTeacher } = req.user;

    if (isTeacher) {
      let contests = await Contest.find({ teacher: userId });
      return res.json({ contests });
    } else {
      try {
        const user = await User.findOne({ _id: new ObjectId(userId) }).populate('contests', '-answers');
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Invalid data" });
      };
      return res.json({ contests: user.contests });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/contest/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const contestId = req.params.id;
    const { isTeacher } = req.user;

    let contest;
    if (isTeacher) {
      try {
        contest = await Contest.findOne({_id: new ObjectId(contestId)}).populate('students', '-password');
      } catch (e) {
        console.log(e);
        res.status(400).json({message: "Invalid data"});
      }
      ;
    } else {
      try {
        contest = await Contest.findOne({_id: new ObjectId(contestId)}).select('-answers');
      } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Invalid data" });
      };
    }

    res.json({ contest });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/contest/:id
router.put("/:id", auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const contestId = req.params.id;

    try {
      const teacher = await Teacher.findOne({ _id: new ObjectId(userId) });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Invalid data" });
    };

    if (!teacher)
      return res.status(400).json({ message: "Викладача не знайдено" });

    try {
      const contest = await Contest.findOne({ _id: new ObjectId(contestId) });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Invalid data" });
    };

    if (!contest)
      return res.status(400).json({ message: "Контест не знайдено" });

    const { studentIds } = req.body;
    let ids = studentIds.split(' ');

    for (const id of ids) {
      let student;
      try {
        student = await User.findOne({ _id: new ObjectId(id) });
      } catch (e) {
        continue;
      }

      if (student) {
        student.contests.push(contest._id);
        contest.students.push(student._id);

        await student.save();
      }
    }

    await contest.save();

    res.json({ message: "Successfully updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
})

module.exports = router;