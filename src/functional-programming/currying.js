// Normal function
function add(a, b) {
  return a + b;
}

let result = add(5, 6);

// Currying is a technique that allows us to take a function that has N arguments
// and covert into a function into 1 argument
// i.e, N => 1

// Currying using normal function synatx
function add2(a) {
  return function (b) {
    return a + b;
  };
}
result = add2(5)(6);

// Curring using arrow syntax
const add3 = (a) => (b) => a + b;
result = add3(5)(6);
