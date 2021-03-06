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
      const user = await User.findOne({ _id: new ObjectId(userId) }).populate('contests', '-answers');
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
    if (isTeacher)
      contest = await Contest.findOne({ _id: new ObjectId(contestId)}).populate('students', '-password');
    else
      contest = await Contest.findOne({ _id: new ObjectId(contestId)}).select('-answers');

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

    const teacher = await Teacher.findOne({ _id: new ObjectId(userId) });
    if (!teacher)
      return res.status(400).json({ message: "Викладача не знайдено" });

    const contest = await Contest.findOne({ _id: new ObjectId(contestId) });
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
        await User.updateOne({ _id: student._id}, { $addToSet: { contests: contest._id } });
        await Contest.updateOne({ _id: contest._id}, { $addToSet: { students: student._id } });
      }
    }

    res.json({ message: "Successfully updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
})

module.exports = router;
