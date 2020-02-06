const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  read_books: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: true
      },
      percentage_read: {
        type: Number,
        default: 100
      }
    }
  ],
  available_books: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
        default: true
      },
      return_date: {
        type: Date
      }
    }
  ],
  borrowed: [
    {
      user: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      return_date: {
        type: Date,
        required: true
      }
    }
  ],
  location: {
    type: String
  },
  bio: {
    type: String,
    required: true
  },
  public_email: {
    type: String,
    required: true
  },
  public_phone: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
