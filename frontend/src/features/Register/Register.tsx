import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/widgets";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loginUser } from "./authenticationSlice";

export const RegisterPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loginReducer.loading);
  const handleNavigation = (route: string) => {
    if (location.pathname === route) {
      return;
    }
    navigate(route);
  };
  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(
        loginUser({ email: emailInput, password: passwordInput })
      );
      if (resultAction.meta.requestStatus === "fulfilled") {
        handleNavigation("/home");
      }
    } catch (error) {}
  };
  return (
    <Box display="flex" height="100vh" width="100vw">
      <Box
        width="50vw"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        color="white"
        bgcolor="var(--primary-color)"
      >
        <Typography variant="h3">Welcome to Hello Ada!</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        width="50vw"
        paddingLeft="2%"
      >
        <Typography variant="h6">Sign in to Task Manager!</Typography>
        <Box marginY="2rem">
          <TextField
            onChange={(event) => setEmailInput(event.target.value)}
            sx={{ width: "80%" }}
            label="Email"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={{ width: "80%" }}
            onChange={(event) => setPasswordInput(event.target.value)}
            label="Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <PrimaryButton
          onClick={handleSubmit}
          sx={{ marginTop: "1rem", width: "10rem" }}
        >
          Sign In
        </PrimaryButton>
        <Box marginTop="3rem" display="flex" alignItems="center">
          <Typography variant="subtitle1">Don't have an account?</Typography>
          <Button sx={{ textTransform: "none", color: "var(--primary-color)" }}>
            Sign up
          </Button>
        </Box>
        {loading ? "Loading..." : null}
      </Box>
    </Box>
  );
};
