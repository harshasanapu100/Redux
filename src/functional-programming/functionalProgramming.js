import { compose, pipe } from "lodash/fp";

// Problem Statement:
// Trim the input, convert it into uppercase and finally wrap in div
let input = "   Javascript      ";

// Non functional programming
let output = "<div>" + input.trim().toUpperCase() + "</div>";

// Functional programming
const trim = (str) => str.trim();
const convertToUppercase = (str) => str.toUpperCase();
const wrapInDiv = (str) => `<div> ${str} </div>`;

// Functional programming using basics
output = wrapInDiv(convertToUppercase(trim(input)));
console.log(output);

// Functional programming using Compose from lodash library
const transfromUsingCompose = compose(wrapInDiv, convertToUppercase, trim);
output = transfromUsingCompose(input);
console.log(output);

// Functional programming using Pipe from lodash library
const transfromUsingPipe = pipe(trim, convertToUppercase, wrapInDiv);
output = transfromUsingPipe(input);
console.log(output);
