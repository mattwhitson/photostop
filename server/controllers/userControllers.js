const express = require("express");
const userServices = require("../services/userServices");
const jwt = require("../middleware/jwt");

const router = express.Router();

const register = (req, res, next) => {
  userServices
    .register(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const login = (req, res, next) => {
  userServices
    .login(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const getProfile = (req, res, next) => {
  userServices
    .getProfile(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

const addProfilePicture = (req, res, next) => {
  userServices
    .addProfilePicture(req)
    .then((response) => res.status(200).json(response))
    .catch(next);
};

router.post("/register", register);

router.post("/addprofilepic", jwt(), addProfilePicture);

router.post("/login", login);

router.get("/profile/:username", getProfile);

module.exports = router;
