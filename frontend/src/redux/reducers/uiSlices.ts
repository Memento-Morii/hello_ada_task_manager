import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../constants/actionTypes";

export enum SnackbarSeverity {
  Error,
  Success,
  Warning,
}
type UIState = {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: SnackbarSeverity;
};
type UIProps = {
  snackbarMessage: string;
  snackbarSeverity: SnackbarSeverity;
};
const initialState: UIState = {
  snackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: SnackbarSeverity.Success,
};
const UIReducer = createSlice({
  name: ActionTypes.SNACKBAR_OPEN,
  initialState,
  reducers: {
    openSnackbar: (state: UIState, action: PayloadAction<UIProps>) => {
      state.snackbarOpen = true;
      state.snackbarMessage = action.payload.snackbarMessage;
      state.snackbarSeverity = action.payload.snackbarSeverity;
    },
    closeSnackbar: (state, action) => {
      state.snackbarOpen = false;
    },
  },
});
export const uiReducer = UIReducer.reducer;
export const { openSnackbar, closeSnackbar } = UIReducer.actions;
