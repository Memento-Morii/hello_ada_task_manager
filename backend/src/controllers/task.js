const express = require("express");
const TaskServices = require("../services/task_services");
const router = express.Router();

const errorHandler = require("../configs/error_handler_config");
const verifyToken = require("../middlewares/verify_token");

router.post(
  "/",
  verifyToken,
  //   validate(signUpSchema)
  errorHandler(TaskServices.create)
);
router.get("/", verifyToken, errorHandler(TaskServices.getAllTasks));
router.get("/search", errorHandler(TaskServices.searchTask));
router.delete("/", verifyToken, errorHandler(TaskServices.deleteTask));
router.put("/", verifyToken, errorHandler(TaskServices.updateTask));

module.exports = router;
