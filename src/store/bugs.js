import { createAction } from "@reduxjs/toolkit";
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

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUG_REMOVED:
      return state.filter((bug) => bug.id != action.payload.id);

    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id == action.payload.id ? { ...bug, resolved: true } : bug
      );

    default:
      return state;
  }
}
