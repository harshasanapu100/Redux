import configureStore from "./store/configureStore";
import * as actionCreators from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(actionCreators.bugAdded({ description: "Bug1" }));

store.dispatch(actionCreators.bugAdded({ description: "Bug2" }));

store.dispatch(actionCreators.bugAdded({ description: "Bug3" }));

store.dispatch(actionCreators.bugResloved({ id: 1 }));

store.dispatch(actionCreators.bugRemoved({ id: 1 }));

console.log(store.getState());

unsubscribe();
