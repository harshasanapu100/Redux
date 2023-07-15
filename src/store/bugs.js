import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// The below pattern implemented using Ducks patteren. Points to remember in Ducks pattern
// 1) Move Action types, Action creators and Reducer into this single module.
// 1) Reducer has to be default export in this module.

let lastId = 0;

// crateSlice combines the createAction & createReducer and automatically creates
// actions and reducer for us
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => actions handlers

    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (state, action) => {
      const index = state.findIndex((bug) => bug.id == action.payload.id);
      state.splice(index, 1);
    },

    bugResloved: (state, action) => {
      const index = state.findIndex((bug) => bug.id == action.payload.id);
      state[index].resolved = true;
    },
  },
});

export const { bugAdded, bugRemoved, bugResloved } = slice.actions;
export default slice.reducer;

// Selector - A selector is a function which takes the state and return computed state
export const getUnresolvedBugs = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved);

// Memoization - Memoization is a techinque for optimizing expensive function
export const getUnresolvedBugsUsingMemoization = createSelector(
  // The output of the state function which is list of bugs get passed to result to next fucntion
  (state) => state.entities.bugs,

  // This function calls first time and store results in cache, scond time onwards if the list of bugs
  // is not changed the logic will not be executed again
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
