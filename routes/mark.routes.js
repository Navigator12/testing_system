const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/User");
const Mark = require("../models/Mark");
const Contest = require("../models/Contest");
const { ObjectId } = require("mongoose").Types;

const router = Router();

// api/mark/create
router.post('/create', auth, async (req, res) => {
  try {
    const { userId } = req.user;
    const { contestId, answers } = req.body;

    const contest = await Contest.findById(contestId);

    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === contest.answers[i])
        correct++;
    }

    const mark = new Mark({
      userId,
      contestId,
      correct,
      estimation: (correct / answers.length * 100).toFixed(2)
    })

    await mark.save();

    res.json({ mark });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get('/:contestId/:userId', async (req, res) => {
  try {
    const { contestId, userId } = req.params;

    const mark = await Mark.find({
      contestId: new ObjectId(contestId),
      userId: new ObjectId(userId)
    });

    if (!mark)
      return res.status(404).json({ message: "There is no mark" });

    res.json({ mark });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
