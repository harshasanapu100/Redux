import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResloved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getUnresolvedBugsUsingMemoization,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed", store.getState());
});

// Users dispatchers
store.dispatch(userAdded({ name: "User1" }));
store.dispatch(userAdded({ name: "User2" }));

// Projects dispatchers
store.dispatch(projectAdded({ name: "Project 1" }));

// Bugs dispatchers
store.dispatch(bugAdded({ description: "Bug1" }));
store.dispatch(bugAdded({ description: "Bug2" }));
store.dispatch(bugAdded({ description: "Bug3" }));
store.dispatch(bugResloved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));

// Passing function as parameter to dispatch method
store.dispatch((dispatch, getState) => {
  // Call  an API endpoint

  // When the promise is resolved => dispatch(res of api call)
  dispatch({ type: "bugsReceived", paylod: { bugs: [1, 2, 3] } });
  console.log(getState());

  // If the promise is rejected => dispatch(error)
});

console.log(store.getState());

// Selectors
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

const bugs = getBugsByUser(2)(store.getState());
console.log(bugs);

unsubscribe();
