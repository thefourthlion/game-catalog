const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logUsers,
  deleteUser,
  updateUser
} = require("../controllers/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/read").get(logUsers);

router.route("/update/:id").post(updateUser);

router.route("/delete/:id").delete(deleteUser);

module.exports = router;