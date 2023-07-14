import { configureStore } from "@reduxjs/toolkit";
import createReducer from "./projects";

export default function () {
  return configureStore({ reducer: createReducer });
}
