const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req) => {
  const { username, password, email } = req.body;

  const alreadyExists = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  if (alreadyExists.rows[0]) throw "This username has already been taken...";

  const passwordHash = bcrypt.hashSync(password, 10);

  const response = await pool.query(
    "INSERT INTO users (username, password, email, profilepicture) VALUES($1, $2, $3, $4) RETURNING *",
    [username, passwordHash, email, null]
  );

  return response.rows[0];
};

const login = async (req) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  if (!user.rows[0]) {
    throw "Username is incorrect";
  }

  if (!(user && bcrypt.compareSync(password, user.rows[0]?.password))) {
    throw "Password is incorrect";
  }

  const token = jwt.sign({ sub: user._id }, "testing", {
    expiresIn: "7d",
  });

  const { id, email, profilepicture: profilePicture } = user.rows[0];

  return {
    id,
    email,
    username,
    profilePicture,
    token,
  };
};

const getProfile = async (req) => {
  const username = req.params.username;

  const response = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return response.rows[0];
};

const addProfilePicture = async (req) => {
  const { userId, downloadURL } = req.body;

  const response = await pool.query(
    "UPDATE users SET profilepicture = $1 WHERE id = $2 RETURNING *",
    [downloadURL, userId]
  );
  console.log(response.rows[0]);
  return response.rows[0];
};

module.exports = {
  register,
  login,
  getProfile,
  addProfilePicture,
};
