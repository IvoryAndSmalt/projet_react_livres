const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

////////////////////// GENERIC PROFILE //////////////////////
/**
 * @route   GET api/profile/me
 * @desc    get current user's profile
 * @access  private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.status(500).send("Server error.");
  }
});

/**
 * @route   POST api/profile
 * @desc    create or update a user profile
 * @access  private
 */
router.post(
  "/",
  [
    auth,
    [
      check("bio", "Bio is required")
        .not()
        .isEmpty(),
      check("public_email", "Email is not valid.").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, bio, public_email, public_phone } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (public_email) profileFields.public_email = public_email;
    if (public_phone) profileFields.public_phone = public_phone;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //   Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //   Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   GET api/profile
 * @desc    Get all profiles
 * @access  public
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET api/profile/user/:user_id
 * @desc    Get one user
 * @access  public
 */

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   DELETE api/profile
 * @desc    Delete profile, user & posts
 * @access  private
 */
router.delete("/", auth, async (req, res) => {
  try {
    //   @TODO remove user's posts
    //   remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
////////////////////// GENERIC PROFILE //////////////////////

////////////////////// AVAILABLE //////////////////////
/**
 * @route   PUT api/profile/available
 * @desc    Add books available for borrowing
 * @access  private
 */
router.put(
  "/available",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("author", "Author is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, available, return_date } = req.body;

    const newAvB = {
      title,
      author,
      available,
      return_date
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.available_books.unshift(newAvB);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   DELETE api/profile/available/:avb_id
 * @desc    Delete available book
 * @access  private
 */
router.delete("/available/:avb_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.available_books
      .map(item => item.id)
      .indexOf(req.params.avb_id);

    profile.available_books.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
////////////////////// AVAILABLE //////////////////////

////////////////////// READ BOOKS //////////////////////
/**
 * @route   PUT api/profile/read
 * @desc    add a book that you read
 * @access  private
 */
router.put(
  "/read",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("author", "Author is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, completed, percentage_read } = req.body;

    const newRead = {
      title,
      author,
      completed,
      percentage_read
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.read_books.unshift(newRead);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   DELETE api/profile/read/:read
 * @desc    Delete a read book (y tho)
 * @access  private
 */
router.delete("/read/:read", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.read_books
      .map(item => item.id)
      .indexOf(req.params.read);

    profile.read_books.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
////////////////////// READ BOOKS //////////////////////

////////////////////// BORROWED BOOKS //////////////////////
/**
 * @route   PUT api/profile/borrowed
 * @desc    add a book that you borrowed
 * @access  private
 */
router.put(
  "/borrowed",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("author", "Author is required")
        .not()
        .isEmpty(),
      check("user", "Please enter the User you borrowed the book from.")
        .not()
        .isEmpty(),
      check("return_date", "Please enter a valid return date.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, user, return_date } = req.body;

    const newBrw = {
      title,
      author,
      user,
      return_date
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.borrowed.unshift(newBrw);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   DELETE api/profile/borrowed/:brw_id
 * @desc    Delete a borrowed book
 * @access  private
 */
router.delete("/borrowed/:brw_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // get remove index
    const removeIndex = profile.borrowed
      .map(item => item.id)
      .indexOf(req.params.brw_id);

    profile.borrowed.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
////////////////////// BORROWED BOOKS //////////////////////

module.exports = router;
