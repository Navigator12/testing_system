const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Contest = require("../models/Contest");
const { ObjectId } = require("mongoose").Types;

const router = Router();

// /api/contest/create
router.post("/create", auth, async (req, res) => {
  try {
    const { userId, isTeacher } = req.user;
    const { name, tasks, answers } = req.body;

    console.log(`${userId} -> ${typeof userId}`);
    res.json({"kk": "pp"});

    const teacher = await Teacher.findOne({ _id: new ObjectId(userId) });

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

    res.status(201).json({ message: "Контест створений" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/contest/index
router.get("/index", auth, async (req, res) => {
  try {
    const { userId, isTeacher } = req.user;

    // TODO зробити контести і для обичних юзерів(структура бд)
    const contests = await Contest.find({ teacher: userId });

    res.json({ contests });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

// /api/contest/:id

router.get("/:id", async (req, res) => {
  try {
    const contestId = req.params.id;
    console.log(contestId);
    const contest = await Contest.findOne({ _id: new ObjectId(contestId)});

    res.json({ contest });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error"});
  }
});

module.exports = router;
