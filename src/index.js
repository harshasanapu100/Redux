import store from "./store";
import { bugAdded, bugRemoved } from "./actionCreators";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(bugAdded("Bug1"));

store.dispatch(bugRemoved(1));

console.log(store.getState());

unsubscribe();
