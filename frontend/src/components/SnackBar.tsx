import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { closeSnackbar, SnackbarSeverity } from "../redux/reducers/uiSlices";

export const CustomSnackBar = () => {
  const dispatch = useAppDispatch();
  const { snackbarOpen, snackbarMessage, snackbarSeverity } = useAppSelector(
    (state) => state.ui
  );
  let severity: any = "";
  switch (snackbarSeverity) {
    case SnackbarSeverity.Success:
      severity = "success";
      break;
    case SnackbarSeverity.Error:
      severity = "error";
      break;
    case SnackbarSeverity.Warning:
      severity = "warning";
      break;
    default:
      severity = "error";
      break;
  }
  return (
    <Snackbar
      onClose={() => dispatch(closeSnackbar({}))}
      open={snackbarOpen}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => dispatch(closeSnackbar({}))}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
