import { Button, styled } from "@mui/material";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "var(--primary-color)",
  color: "#FFFFFF",
  textTransform: "none",
  padding: "5px 1rem",
  borderRadius: "1rem",
  ":hover": {
    backgroundColor: "var(--primary-color)",
  },
}));
