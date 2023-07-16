// This middleware is already built for us by redux toolkit. Its call thunk. If we use redux toolkit
// we can ignore the below middleware. Just need to modify the store to make it work.
const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch, getState);
    } else next(action);
  };

export default func;
