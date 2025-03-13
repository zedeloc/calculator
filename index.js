function add(a, b){
    return +a + +b;
}
function subtract(a, b) {  
    return +a - +b;
}
function multiply(a, b) {
    return +a * +b;
}
function divide(a, b) {
    if (+a === 0 || +b === 0){
        return "666 FATAL ERROR"
    }
    return +a / +b;
}

let operandA = "";
let operandB = "";
let operator = "";
const historicValueField = [];
const activeValueField = []



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

const displayActive = document.querySelector("#display-active");
const displayHistoric = document.querySelector('#display-historic')
const keys = Array.from(document.querySelectorAll(".key"));



keys.forEach((key) => key.addEventListener("click", () => {
    if (key.id === 'clear') {
        displayActive.textContent = ''
        displayHistoric.textContent = ''
        operandA = ''
        operandB = ''
        operator = ''
    }else {
        operatorEval(key.id)
    }
}))

function operatorEval(keypress) {
    if (keypress === "=" && operandA.length > 0) {
        operandB = displayActive.textContent;
        let answer = operate(operandA, operandB, operator)
        displayActive.textContent = answer; 
    } else if (keypress === '+' 
        || keypress === '-'
        || keypress === '*'
        || keypress === '/') {
        operator = keypress;
        displayHistoric.textContent += keypress;
        operandA = displayActive.textContent;
        displayActive.textContent = "";
    } else {
        displayHistoric.textContent += keypress;
        displayActive.textContent += keypress;
    }
}

function updateValues(valuePassed) {


}

function updateValueField(valueField, valuePassed) {
    if (valuePassed === 'clear') {
        valueField.length = 0;
    } else if (valuePassed === 'delete') {
        valueField.pop();
    } else if (valuePassed === '.') {
        for (let value of valueField ) {
            if (value === ".") { 
                break;
            }
        } 
    } else {
        valueField.push(valuePassed)
    }
}