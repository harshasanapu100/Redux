import { createSlice } from "@reduxjs/toolkit";
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
