const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

// get all posts
router.get("/", getPosts);

// get post by id
router.get("/:post_id", getPost);

// create a new post
router.post("/", addPost);

// delete a specific post by id
router.delete("/:post_id", deletePost);

// update a specific post by id
router.put("/:post_id", updatePost);

module.exports = router;