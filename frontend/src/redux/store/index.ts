import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducers from "../reducers";
import thunk from "@reduxjs/toolkit";

const store = configureStore({
  reducer: reducers,
  devTools: true,
});
export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
