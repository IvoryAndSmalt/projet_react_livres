const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Book = require("../../models/Book");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

/**
 * @route   POST api/books
 * @desc    Create a book
 * @access  private
 */
router.post(
  "/",
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

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        name: user.name,
        user: req.user.id
      });

      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   GET api/books
 * @desc    Get all books
 * @access  private
 */
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find().sort({ date: -1 });

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   GET api/books/:book_id
 * @desc    Get one book id
 * @access  private
 */
router.get("/:book_id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);

    if (!book) {
      return res.status(404).json({ msg: "book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "book not found" });
    }

    res.status(500).send("Server error");
  }
});

/**
 * @route   DELETE api/books/:book_id
 * @desc    delete one book
 * @access  private
 */
router.delete("/:book_id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.book_id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found." });
    }

    // check that user owns book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorizerd." });
    }

    await book.remove();
    res.json({ msg: "Book successfully removed." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "book not found" });
    }
    res.status(500).send("Server error");
  }
});

///////////////// BOOK COMMENTS ////////////////////
/**
 * @route   POST api/books/comment/:id
 * @desc    comment on a book
 * @access  private
 */
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Comment content is required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const book = await Book.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      book.comments.unshift(newComment);
      book.save();
      res.json(book.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   DELETE api/books/comment/:id/:comment_id
 * @desc    delete a comment
 * @access  private
 */
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // Get comment from book
    const comment = book.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found." });
    }

    // Check if user has right to delete
    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "Unauthorized." });
    }

    // get index to remove
    const removeIndex = book.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    book.comments.splice(removeIndex, 1);

    await book.save();

    res.json(book.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
///////////////// BOOK COMMENTS ////////////////////

module.exports = router;
