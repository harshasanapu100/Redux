import store from "./store";
import * as actionCreators from "./actionCreators";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(actionCreators.bugAdded("Bug1"));

store.dispatch(actionCreators.bugResloved(1));

store.dispatch(actionCreators.bugRemoved(1));

console.log(store.getState());

unsubscribe();
