import { Box, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type TaskCardProps = {
  title: string;
  description: string;
  createdOn: string;
};
export const TaskCard = ({ title, description, createdOn }: TaskCardProps) => {
  return (
    <Box
      padding="1rem"
      width="90%"
      maxHeight="200px"
      borderRadius="4px"
      bgcolor="white"
      marginTop="1rem"
    >
      <Typography variant="h6">{title}</Typography>
      <Typography marginTop="1rem" color="gray" variant="subtitle1">
        {description}
      </Typography>
      <Typography marginTop="0.5rem" color="gray" variant="subtitle2">
        {createdOn}
      </Typography>
      <Box marginTop="1rem" display="flex">
        <EditOutlinedIcon sx={{ cursor: "pointer", color: "orange" }} />
        <DeleteOutlineOutlinedIcon
          sx={{ cursor: "pointer", marginLeft: "0.5rem", color: "red" }}
        />
      </Box>
    </Box>
  );
};
