import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../../redux/constants/actionTypes";
import axios from "axios";
import { openSnackbar, SnackbarSeverity } from "../../redux/reducers/uiSlices";

interface CustomState {
  loading?: boolean;
  error?: string;
}
type IRegisterState = {
  email?: string;
  password?: string;
  responsePayload?: any;
  loading?: boolean;
  error?: string;
};
type IUserProps = {
  responsePayload?: any;
};
type IRegisterAction = {
  type: string;
  action: IRegisterState;
};
const initialState: IRegisterState = {
  loading: false,
  email: undefined,
  password: undefined,
  responsePayload: undefined,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: IRegisterState, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email: email,
          password: password,
        }
      );
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
      // let navigate = useNavigate();
      // navigate("/home");
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      const errorMessage: string = err.response.data.message;
      thunkAPI.dispatch(
        openSnackbar({
          snackbarMessage: errorMessage,
          snackbarSeverity: SnackbarSeverity.Error,
        })
      );
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const signUpUser = createAsyncThunk(
  "user/signup",
  async ({ email, password }: IRegisterState, thunkAPI) => {
    const response = await axios.post("http://localhost:3001/api/user/signup", {
      email: email,
      password: password,
    });
    if (response.status === 400) {
      console.log(response);
      // Return the known error for future handling
      return thunkAPI.rejectWithValue(await response.data.json());
    }
    const data = response.data;
    console.log(data);
    return data;
  }
);
const LoginReducer = createSlice({
  name: ActionTypes.LOGIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<IRegisterState>) => {
        state.loading = false;
        state.responsePayload = action.payload;
        const authToken = state.responsePayload.result.authToken;
        localStorage.setItem("authToken", authToken);
      }
    );
    builder.addCase(loginUser.rejected, (state, obj) => {
      console.log({ Obj: obj.payload });
      const errorMessage: any = obj.payload;
      state.error = errorMessage.message;
      state.loading = false;
    });
  },
});
const SignupReducer = createSlice({
  name: ActionTypes.LOGIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<IRegisterState>) => {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.loading = false;
        state.responsePayload = action.payload;
      }
    );
  },
});
export const loginReducer = LoginReducer.reducer;
export const signupReducer = SignupReducer.reducer;
