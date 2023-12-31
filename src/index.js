import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResloved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getUnresolvedBugsUsingMemoization,
  getBugsByUser,
  loadBugs,
  addBug,
  resolveBug,
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
//store.dispatch(bugAdded({ description: "Bug1" }));
//store.dispatch(bugAdded({ description: "Bug2" }));
//store.dispatch(bugAdded({ description: "Bug3" }));
//store.dispatch(bugResloved({ id: 1 }));
//store.dispatch(bugRemoved({ id: 1 }));
//store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));

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

// Passing function as parameter to dispatch method
store.dispatch((dispatch, getState) => {
  // Call  an API endpoint

  // When the promise is resolved => dispatch(res of api call)
  dispatch({ type: "bugsReceivedTemp", paylod: { bugs: [1, 2, 3] } });

  // If the promise is rejected => dispatch(error)
});

store.dispatch({
  type: "error",
  payload: {
    message: "An error occurred",
  },
});

// Calling backend API

store.dispatch(loadBugs());

// Caching the loadBugs
setTimeout(() => {
  store.dispatch(loadBugs());
}, 3000);

store.dispatch(addBug({ description: "a" }));

store.dispatch(resolveBug(2));

unsubscribe();
