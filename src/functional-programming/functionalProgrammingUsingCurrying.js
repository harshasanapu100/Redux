import { pipe } from "lodash/fp";

// Problem Statement:
// Trim the input, convert it into uppercase and finally wrap in an any html element
let input = "   Javascript      ";

// If input is div then
let output = "<div>" + input.trim().toUpperCase() + "</div>";

// If input is span then
output = "<span>" + input.trim().toUpperCase() + "</span>";

// If input is h1 then
output = "<h1>" + input.trim().toUpperCase() + "</h1>";

const trim = (str) => str.trim();
const convertToUppercase = (str) => str.toUpperCase();
const wrap = (type) => (str) => `<${type}> ${str} </${type}>`; // Currying applied here

const wrapInDiv = pipe(trim, convertToUppercase, wrap("div"));
const wrapInSpan = pipe(trim, convertToUppercase, wrap("span"));
const wrapInh1 = pipe(trim, convertToUppercase, wrap("h1"));
