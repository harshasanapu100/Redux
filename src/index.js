import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResloved,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// Projects dispatchers
store.dispatch(projectAdded({ name: "Project 1" }));

// Bugs dispatchers
store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugAdded({ description: "Bug3" }));
store.dispatch(bugResloved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));

console.log(store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

unsubscribe();
