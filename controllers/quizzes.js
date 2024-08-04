const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("quizzes/index.ejs", {
      quizzes: currentUser.quizzes,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("quizzes/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.quizzes.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/quizzes`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
