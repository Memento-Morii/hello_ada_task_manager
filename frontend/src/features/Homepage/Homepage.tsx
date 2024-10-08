import {
  Box,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TaskCard } from "../../components/TaskCard";
import { PrimaryButton } from "../../components/widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  createTask,
  deleteTask,
  fetchTasks,
  TaskModel,
  updateTask,
} from "./taskSlice";
import { formatDate } from "../../utils/utilityFunctions";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: "720px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 0,
  borderRadius: "8px",
  p: "16px",
};

export const HomePage = () => {
  const [taskModalOpen, setTaskModalOpen] = React.useState(false);
  const handleTaskModalOpen = () => setTaskModalOpen(true);
  const handleTaskModalClose = () => setTaskModalOpen(false);
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.taskReducer.loading);
  const tasks = useAppSelector((state) => state.taskReducer.tasks);

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskModel | null>(null);

  const handleSubmit = async () => {
    try {
      let isEdit = selectedTask !== null;
      let editedTask: TaskModel | null = isEdit
        ? {
            id: selectedTask?.id,
            title: titleInput,
            description: descriptionInput,
            createdAt: selectedTask?.createdAt,
          }
        : null;
      const resultAction = await dispatch(
        isEdit
          ? updateTask(editedTask!)
          : createTask({
              title: titleInput,
              description: descriptionInput,
            })
      );
      if (resultAction.meta.requestStatus === "fulfilled") {
        setTaskModalOpen(false);
        dispatch(fetchTasks({}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (taskId: number) => {
    try {
      const resultAction = await dispatch(deleteTask(taskId));
      if (resultAction.meta.requestStatus === "fulfilled") {
        dispatch(fetchTasks({}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (selectedTask: TaskModel) => {
    setSelectedTask(selectedTask);
    setTitleInput(selectedTask.title ?? "");
    setDescriptionInput(selectedTask.description ?? "");
    handleTaskModalOpen();
  };
  const handleAdd = () => {
    setSelectedTask(null);
    setTitleInput("");
    setDescriptionInput("");
    handleTaskModalOpen();
  };
  useEffect(() => {
    dispatch(fetchTasks({}));
  }, []);
  return loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box
      bgcolor="#F5F6FA"
      display="flex"
      flexDirection="column"
      minHeight="90vh"
      padding="3rem"
    >
      <PrimaryButton
        startIcon={<LogoutIcon />}
        sx={{
          marginLeft: "auto",
          marginBottom: "2rem",
          bgcolor: "red",
          ":hover": {
            backgroundColor: "red",
          },
        }}
      >
        Logout
      </PrimaryButton>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">My Tasks</Typography>
        <PrimaryButton onClick={handleAdd}>Add Task</PrimaryButton>
      </Box>
      <Grid spacing={2} container>
        {tasks?.map((item) => (
          <Grid key={item.id} lg={4} item>
            <TaskCard
              title={item.title ?? ""}
              description={item.description ?? ""}
              createdOn={formatDate(item.createdAt ?? new Date().toString())}
              onUpdateClicked={() => handleUpdate(item)}
              onDeleteClicked={() => handleDelete(item.id!)}
            />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={taskModalOpen}
        onClose={handleTaskModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        children={
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Add Task</Typography>
              <CloseIcon
                onClick={handleTaskModalClose}
                sx={{ cursor: "pointer", color: "grey" }}
              />
            </Box>
            <Box marginY="2rem">
              <TextField
                value={titleInput}
                sx={{ width: "100%" }}
                onChange={(event) => setTitleInput(event.target.value)}
                label="Title"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                value={descriptionInput}
                sx={{ width: "100%" }}
                onChange={(event) => setDescriptionInput(event.target.value)}
                label="Description"
                multiline
                rows={4}
              />
            </Box>
            <PrimaryButton onClick={handleSubmit} sx={{ marginTop: "1rem" }}>
              Submit
            </PrimaryButton>
          </Box>
        }
      />
    </Box>
  );
};
