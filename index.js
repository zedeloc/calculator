function add(a, b){
    return a + b;
}
function subtract(a, b) {  
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (a === 0 || b === 0){
        return "666 FATAL ERROR"
    }
    return a / b;
}

let operandA;
let operandB;
let operator;



// Create a new function operate that takes an operator and two numbers and then calls one of the above functions on the numbers.
function operate(a, b, c) {
    if (c === "+") {
        return add(a, b);
    } else if (c === "-") {
        return subtract(a, b);
    } else if (c === "*") {
        return multiply(a, b);
    } else if (c === "/") {
        return divide(a ,b);
    };
};
