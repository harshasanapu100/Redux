import { createAction, createReducer } from "@reduxjs/toolkit";
// The below pattern implemented using Ducks patteren. Points to remember in Ducks pattern
// 1) Move Action types, Action creators and Reducer into this single module.
// 1) Reducer has to be default export in this module.

// Action types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
export const bugAdded = createAction(BUG_ADDED);

export const bugRemoved = createAction(BUG_REMOVED);

export const bugResloved = createAction(BUG_RESOLVED);

// Reducer

let lastId = 0;
export default createReducer([], {
  // key : value
  // actions: functions to handle the action (event => event handler)

  [BUG_ADDED]: (state, action) => {
    state.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },

  [BUG_REMOVED]: (state, action) => {
    const index = state.findIndex((bug) => bug.id == action.payload.id);
    state.splice(index, 1);
  },

  [BUG_RESOLVED]: (state, action) => {
    const index = state.findIndex((bug) => bug.id == action.payload.id);
    state[index].resolved = true;
  },
});
