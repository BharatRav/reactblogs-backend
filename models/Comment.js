const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  desc: String,
  userEmail: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postSlug: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
