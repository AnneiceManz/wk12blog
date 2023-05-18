const db = require("../db/db-connection.js");
const jwt = require("jsonwebtoken");

const getPosts = async (req, res) => {
  try {
    if (req.query.category) {
      const { rows: posts } = await db.query(
        "SELECT * FROM posts WHERE category = $1 ORDER BY date DESC",
        [req.query.category]
      );
      return res.status(200).json(posts);
    } else {
      const { rows: posts } = await db.query("SELECT * FROM posts ORDER BY date DESC");
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getPost = async (req, res) => {
  // console.log("got a request");
  try {
    const { post_id } = req.params;
    // console.log(post_id);
    const q =
      "SELECT post_id, users.username, posts.image_url, posts.body, posts.date, posts.category, posts.title FROM posts LEFT JOIN users ON posts.user_id=users.user_id WHERE post_id=$1";
    const { rows: post } = await db.query(q, [post_id]);
    // console.log(post);
    res.status(200).json(post[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const addPost = async (req, res) => {
  try {
    const token = await req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    console.log("userinfo", userInfo.user_id);

    const { title, body, image_url, category, user_id, date } = req.body;
    console.log(req.body);
    const q =
      "INSERT INTO posts (title, body, image_url, category, user_id, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const { rows: addedPost } = await db.query(q, [
      title,
      body,
      image_url,
      category,
      user_id,
      date,
    ]);
    res.status(200).json(addedPost);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    console.log("called");
    // make sure there is a valid token
    console.log("req cookies", req.cookies);
    const token = await req.cookies.access_token;
    console.log("token", token);
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    console.log("userinfo", userInfo);

    const { post_id } = req.params;
    const q = "DELETE FROM posts WHERE post_id = $1";
    await db.query(q, [post_id]);
    res.status(200).json("Post has been deleted!");
  } catch (error) {
    console.log(error.message);
  }
};

const updatePost = async (req, res) => {
  console.log("test 1");
  try {
    const { post_id } = req.params;
    console.log("req params", req.params);
    const token = await req.cookies.access_token;
    // console.log("token", token);
    if (!token) return res.status(401).json("Not authenticated");

    const userInfo = jwt.verify(token, "jwtkey");
    // console.log("userinfo", userInfo);

    const { title, body, image_url, category, date } = req.body;
    console.log("req body", req.body);
    const q =
      "UPDATE posts SET title=$1, body=$2, image_url=$3, category=$4, date=$5 WHERE post_id = $6 AND user_id = $7 RETURNING *";
    const { rows: addedPost } = await db.query(q, [
      title,
      body,
      image_url,
      category,
      date,
      post_id,
      userInfo.id,
    ]);
    res.status(200).json(addedPost);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { getPosts, getPost, addPost, deletePost, updatePost };