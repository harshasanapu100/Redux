import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan, apiCallFailed } from "./api";

// The below pattern implemented using Ducks patteren. Points to remember in Ducks pattern
// 1) Move Action types, Action creators and Reducer into this single module.
// 1) Reducer has to be default export in this module.

let lastId = 0;

// crateSlice combines the createAction & createReducer and automatically creates
// actions and reducer for us
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: "false",
    lastFetch: null,
  },
  reducers: {
    // actions => actions handlers

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id == action.payload.id);
      bugs.list.splice(index, 1);
    },

    bugResloved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id == action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },
  },
});

export const {
  bugAdded,
  bugRemoved,
  bugResloved,
  bugAssignedToUser,
  bugsReceived,
} = slice.actions;
export default slice.reducer;

// Action creators
const url = "bugs";
export const loadBugs = () =>
  apiCallBegan({
    url: url,
    method: "get",
    onSuccess: bugsReceived.type,
    onError: apiCallFailed.type,
  });

// Selector - A selector is a function which takes the state and return computed state
export const getUnresolvedBugs = (state) =>
  state.entities.bugs.list.filter((bug) => !bug.resolved);

// Memoization - Memoization is a techinque for optimizing expensive function
export const getUnresolvedBugsUsingMemoization = createSelector(
  // The output of the state function which is list of bugs get passed to result to next fucntion(bugs)
  (state) => state.entities.bugs.list,

  // This function calls first time and store results in cache, scond time onwards if the list of bugs
  // is not changed the logic will not be executed again
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs.list,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
