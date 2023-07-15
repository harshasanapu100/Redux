import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResloved,
  getUnresolvedBugs,
  getUnresolvedBugsUsingMemoization,
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

const unresolvedBugs1 = getUnresolvedBugs(store.getState());
const unresolvedBugs2 = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs1 == unresolvedBugs2); // false

const unresolvedBugsMemoization1 = getUnresolvedBugsUsingMemoization(
  store.getState()
);
const unresolvedBugsMemoization2 = getUnresolvedBugsUsingMemoization(
  store.getState()
);
console.log(unresolvedBugsMemoization1 == unresolvedBugsMemoization2); // true

unsubscribe();
