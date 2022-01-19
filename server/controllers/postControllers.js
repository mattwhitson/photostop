const express = require("express");
const router = express.Router();
const postServices = require("../services/postServices");
const jwt = require("../middleware/jwt");

const addPost = (req, res, next) => {
  postServices
    .addPost(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const addImageToPost = (req, res, next) => {
  postServices
    .addImageToPost(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const getPosts = (req, res, next) => {
  postServices
    .getPosts(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const addComment = (req, res, next) => {
  postServices
    .addComment(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const getComments = (req, res, next) => {
  postServices
    .getComments(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const getLikes = (req, res, next) => {
  postServices
    .getLikes(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const addLike = (req, res, next) => {
  postServices
    .addLike(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const removeLike = (req, res, next) => {
  postServices
    .removeLike(req)
    .then(() => res.status(200).json())
    .catch(next);
};

const getUsersPosts = (req, res, next) => {
  postServices
    .getUsersPosts(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const getPost = (req, res, next) => {
  postServices
    .getPost(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

router.get("/get", getPosts);
router.get("/post/:id", getPost);
router.get("/:username", getUsersPosts);
router.post("/add", jwt(), addPost);
router.post("/addimage", jwt(), addImageToPost);
router.get("/getcomments/:postId", getComments);
router.get("/likes/:postId", getLikes);
router.post("/addcomment", jwt(), addComment);
router.delete("/likes/remove/:params", jwt(), removeLike);
router.post("/likes", jwt(), addLike);

module.exports = router;
