const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ApiResponse = require("../configs/api_response");
const SERECT_KEY = require("../helpers/constants");
const ResponseMessage = require("../helpers/response_message");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);

  //Creating User
  let user = await User.create({
    email: req.body.email,
    password: encryptedPassword,
  });

  if (user) {
    const token = jwt.sign({ uuid: user.uuid }, SERECT_KEY);

    ApiResponse.success(res, {
      authToken: token,
      user,
    });
  }
};

const login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) return ApiResponse.error(res, ResponseMessage.USER_NOT_FOUND, 200);
  const isVaildPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isVaildPassword)
    return ApiResponse.error(res, ResponseMessage.USER_NOT_FOUND, 400);

  const token = jwt.sign({ uuid: user.uuid }, SERECT_KEY);
  ApiResponse.success(res, {
    authToken: token,
    user,
  });
};

const userProfile = async (req, res) => {
  // await User.sync();
  ApiResponse.success(res, req.body.user);
};

const getAllUsers = async (req, res) => {
  let users = await User.findAll({
    order: [["createdAt", "DESC"]],
  });
  if (!users)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(res, users);
};
module.exports = {
  signUp,
  login,
  userProfile,
  getAllUsers,
};
