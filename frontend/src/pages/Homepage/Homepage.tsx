import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { TaskCard } from "../../components/TaskCard";
import { PrimaryButton } from "../../components/widgets";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

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
  return (
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
        <PrimaryButton onClick={handleTaskModalOpen}>Add Task</PrimaryButton>
      </Box>
      <Grid container>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid lg={4} spacing={2} item>
            <TaskCard
              title="Test Title"
              description="Cupidatat anim duis commodo anim sit sunt enim aliqua nostrud duis qui cillum non."
              createdOn="Aug 12, 2024"
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
                sx={{ width: "100%" }}
                label="Title"
                variant="outlined"
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: "100%" }}
                label="Description"
                multiline
                rows={4}
              />
            </Box>
            <PrimaryButton sx={{ marginTop: "1rem" }}>Submit</PrimaryButton>
          </Box>
        }
      />
    </Box>
  );
};
