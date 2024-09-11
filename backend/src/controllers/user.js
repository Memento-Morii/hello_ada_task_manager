const express = require("express");
const UserServices = require("../services/user_services");
const router = express.Router();

const validate = require("../middlewares/validate");
const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

// const signUpSchema = require("../validators/user/signup_validator");
// const loginSchema = require("../validators/user/login_validator");

router.post(
  "/signup",
  //   validate(signUpSchema)
  errorHandler(UserServices.signUp)
);
router.post("/login", errorHandler(UserServices.login));
router.get("/", verifyToken, errorHandler(UserServices.userProfile));
router.get("/all", verifyToken, errorHandler(UserServices.getAllUsers));
module.exports = router;
