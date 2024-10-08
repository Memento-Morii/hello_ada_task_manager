import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../../redux/constants/actionTypes";
import axios from "axios";
import { openSnackbar, SnackbarSeverity } from "../../redux/reducers/uiSlices";

export type TaskModel = {
  id?: number;
  title?: string;
  description?: string;
  status?: number;
  createdAt?: string;
};
export type ITaskState = {
  loading?: boolean;
  error?: string;
  tasks?: TaskModel[];
};
export type ITaskAction = {
  tasks: TaskModel[];
};
const initialState: ITaskState = {
  loading: false,
};
export const fetchTasks = createAsyncThunk(
  "task/fetch",
  async ({}: ITaskState, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3001/api/task/", {
        headers: { authToken: token },
      });
      if (response.data.RESPONSE === "FAILURE") {
        const errMessage: string = response.data.message;
        thunkAPI.dispatch(
          openSnackbar({
            snackbarMessage: errMessage,
            snackbarSeverity: SnackbarSeverity.Error,
          })
        );
        return thunkAPI.rejectWithValue(response.data);
      }
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (err: any) {
      console.log({ myError: err });
      if (!err.response) {
        throw err;
      }
      //   const errorMessage: string = err.response.data.message;
      //   thunkAPI.dispatch(
      //     openSnackbar({
      //       snackbarMessage: errorMessage,
      //       snackbarSeverity: SnackbarSeverity.Error,
      //     })
      //   );
      //   return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const createTask = createAsyncThunk(
  "task/create",
  async (task: TaskModel, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3001/api/task/",
        task,
        {
          headers: { authToken: token },
        }
      );
      console.log(response.data);
      if (response.data.RESPONSE === "FAILURE") {
        const errMessage: string = response.data.message;
        thunkAPI.dispatch(
          openSnackbar({
            snackbarMessage: errMessage,
            snackbarSeverity: SnackbarSeverity.Error,
          })
        );
        return thunkAPI.rejectWithValue(response.data);
      }
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (error: any) {
      console.log({ myError: error });
      if (!error.response) {
        throw error;
      }
      const errorMessage: string = error.response.data.message;
      thunkAPI.dispatch(
        openSnackbar({
          snackbarMessage: errorMessage,
          snackbarSeverity: SnackbarSeverity.Error,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateTask = createAsyncThunk(
  "task/update",
  async (task: TaskModel, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:3001/api/task/",
        task,
        {
          params: { taskId: task.id },
          headers: { authToken: token },
        }
      );
      console.log(response.data);
      if (response.data.RESPONSE === "FAILURE") {
        const errMessage: string = response.data.message;
        thunkAPI.dispatch(
          openSnackbar({
            snackbarMessage: errMessage,
            snackbarSeverity: SnackbarSeverity.Error,
          })
        );
        return thunkAPI.rejectWithValue(response.data);
      }
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (error: any) {
      console.log({ myError: error });
      if (!error.response) {
        throw error;
      }
      const errorMessage: string = error.response.data.message;
      thunkAPI.dispatch(
        openSnackbar({
          snackbarMessage: errorMessage,
          snackbarSeverity: SnackbarSeverity.Error,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (taskId: number, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete("http://localhost:3001/api/task/", {
        params: { taskId: taskId },
        headers: { authToken: token },
      });
      if (response.data.RESPONSE === "FAILURE") {
        const errMessage: string = response.data.message;
        thunkAPI.dispatch(
          openSnackbar({
            snackbarMessage: errMessage,
            snackbarSeverity: SnackbarSeverity.Error,
          })
        );
        return thunkAPI.rejectWithValue(response.data);
      }
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (error: any) {
      console.log({ myError: error });
      if (!error.response) {
        throw error;
      }
      const errorMessage: string = error.response.data.message;
      thunkAPI.dispatch(
        openSnackbar({
          snackbarMessage: errorMessage,
          snackbarSeverity: SnackbarSeverity.Error,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const TaskReducer = createSlice({
  name: ActionTypes.FETCH_TASKS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<TaskModel[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      }
    );
    builder.addCase(fetchTasks.rejected, (state, obj) => {
      state.loading = false;
    });
    builder.addCase(createTask.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<TaskModel[]>) => {
        // state.loading = false;
      }
    );
    builder.addCase(updateTask.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(
      updateTask.fulfilled,
      (state, action: PayloadAction<TaskModel[]>) => {
        // state.loading = false;
      }
    );
  },
});
export default TaskReducer;
export const taskReducer = TaskReducer.reducer;
