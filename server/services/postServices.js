const pool = require("../db");

const addPost = async (req) => {
  const { uid, username, caption, url } = req.body;
  const response = await pool.query(
    "INSERT INTO posts (caption, userid, username, createdat) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
    [caption, uid, username]
  );

  return response.rows[0];
};

const addImageToPost = async (req) => {
  const { url, id } = req.body;
  const response = await pool.query(
    "UPDATE posts SET url = $1 WHERE id = $2 RETURNING *",
    [url, id]
  );

  return response.rows[0];
};

const getPosts = async (req) => {
  const response = await pool.query("SELECT * FROM posts");
  return response.rows;
};

const addComment = async (req) => {
  const { comment, username, postId } = req.body;
  const response = await pool.query(
    "INSERT INTO comments(comment, username, timestamp, postid) VALUES($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *",
    [comment, username, postId]
  );

  return response.rows[0];
};

const getComments = async (req) => {
  const { postId } = req.params;
  const response = await pool.query(
    "SELECT * FROM comments WHERE postid = $1",
    [postId]
  );
  return response.rows;
};

const getLikes = async (req) => {
  const { postId } = req.params;
  const response = await pool.query("SELECT * FROM likes WHERE postid = $1", [
    postId,
  ]);
  return response.rows;
};

const addLike = async (req) => {
  const { postId, userId, username } = req.body;
  const response = await pool.query(
    "INSERT INTO likes(postid, userid, username, timestamp) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
    [postId, userId, username]
  );

  return response.rows[0];
};

const removeLike = async (req) => {
  const params = req.params.params.split("&");
  const postId = params[0];
  const userId = params[1];
  await pool.query("DELETE FROM likes WHERE postid = $1 AND userid = $2", [
    postId,
    userId,
  ]);
};

const getUsersPosts = async (req) => {
  const username = req.params.username;

  const response = await pool.query("SELECT * FROM posts WHERE username = $1", [
    username,
  ]);

  return response.rows;
};

const getPost = async (req) => {
  const postId = req.params.id;
  const response = await pool.query("SELECT * FROM posts WHERE id = $1", [
    postId,
  ]);

  return response.rows[0];
};

module.exports = {
  addPost,
  addImageToPost,
  getPosts,
  addComment,
  getComments,
  getLikes,
  addLike,
  removeLike,
  getUsersPosts,
  getPost,
};
