const ApiResponse = require("../configs/api_response");
const ResponseMessage = require("../helpers/response_message");
const Task = require("../models/task");
const Fuse = require("fuse.js");

const create = async (req, res) => {
  //Creating task
  let task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.user.id,
  });

  if (!task)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(res, task);
};

const getAllTasks = async (req, res) => {
  // await Book.sync({ alter: true });
  let taskList = await Task.findAll({
    where: { status: "1" },
    order: [["createdAt", "DESC"]],
  });

  if (!taskList)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(res, taskList);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.query;
  if (!taskId) return ApiResponse.error(res, "Task ID Not Found", 400);
  let taskList = await Task.update(
    {
      status: "2",
    },
    {
      where: { id: taskId },
    }
  );

  if (!taskList)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(res, taskList);
};
const updateTask = async (req, res) => {
  const { taskId } = req.query;
  if (!taskId) return ApiResponse.error(res, "Task ID Not Found", 400);
  let taskList = await Task.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: { id: taskId },
    }
  );

  if (!taskList)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(res, taskList);
};
const searchTask = async (req, res) => {
  const { search } = req.query;
  if (!search) return ApiResponse.error(res, "Forum ID Not Found", 400);
  let taskList = await Task.findAll({
    where: {
      status: "1",
    },
    order: [["createdAt", "DESC"]],
  });
  let taskArray = [];
  taskList.map((task) => taskArray.push(task.get()));
  let fuse = new Fuse(taskArray, {
    keys: ["title", "description"],
    includeScore: false,
  });
  const searchedResult = fuse.search(search);

  if (!searchedResult)
    return ApiResponse.error(res, ResponseMessage.SOMETHING_WENT_WRONG, 200);

  return ApiResponse.success(
    res,
    searchedResult.map((sl) => sl.item)
  );
};
module.exports = {
  create,
  getAllTasks,
  deleteTask,
  updateTask,
  searchTask,
};
