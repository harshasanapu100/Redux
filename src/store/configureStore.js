import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function () {
  return configureStore({
    reducer: reducer,
    middleware: [logger({ destionation: "console" }), func],
  });
}
