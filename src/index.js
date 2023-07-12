import configureStore from "./store/configureStore";
import * as actionCreators from "./store/bugs";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(actionCreators.bugAdded("Bug1"));

store.dispatch(actionCreators.bugAdded("Bug2"));

store.dispatch(actionCreators.bugAdded("Bug3"));

store.dispatch(actionCreators.bugResloved(1));

store.dispatch(actionCreators.bugRemoved(1));

console.log(store.getState());

unsubscribe();
