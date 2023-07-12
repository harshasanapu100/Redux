import store from "./store";
import { bugAdded, bugRemoved, bugResloved } from "./actionCreators";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(bugAdded("Bug1"));

store.dispatch(bugResloved(1));

store.dispatch(bugRemoved(1));

console.log(store.getState());

unsubscribe();
