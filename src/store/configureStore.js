import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./bugs";

export default function () {
  return configureStore({ reducer: createReducer });
}
