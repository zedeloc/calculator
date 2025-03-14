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

        return "FATAL ERROR: 666"
    }
    return +a / +b;
}

const operands = ['+', '-', '*', '/']

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
        updateValueField(activeValueField, key.id);
        updateValueField(historicValueField, key.id);
        displayCurrentValues()
    } else if (displayActive.textContent == 'FATAL ERROR: 666') {
        updateValueField(activeValueField, 'clear');
        updateValueField(historicValueField, 'clear');
        updateValueField(activeValueField, key.id);
        updateValueField(historicValueField, key.id);
        displayCurrentValues()
    } else {
        operatorEval(key.id)
    }
}))

function operatorEval(keypress) {
    if (keypress === "=" && operandA.length > 0) {
        operandB = returnActiveOperand();
        let answer = operate(operandA, operandB, operator)
        if (answer === "FATAL ERROR: 666") {
            operandA = ''
            displayActive.textContent = answer;
            return
        }
        answer = (Math.floor(answer * 10000) / 10000); // round to 4 decimal places
        answer = answer.toString().split('');
        updateValueField(activeValueField, 'clear');
        updateValueField(activeValueField, answer); 
        operandA = '';
        operandB = ''
        updateValueField(historicValueField, 'clear')
        updateValueField(historicValueField, answer)
        displayCurrentValues();
        // updateValueField(activeValueField, 'clear')

        return;
    } else if (keypress === "=" && operandA.length === 0) {
        return;
    } else if (keypress === '+' 
        || keypress === '-'
        || keypress === '*'
        || keypress === '/') {
        
        if (activeValueField.length === 0 && historicValueField.length === 0) {
            return
        }
// attempt to eliminate the double operator. maybe force the operation every time instead of prevent multiple operators?
        // if (historicValueField.find(historicValue => operands.find((op) => op === historicValue))) {
        //     return
        // }
        operator = keypress;
        updateValueField(historicValueField, keypress);
        displayCurrentValues()
        
        
        if (operandA.length <= 0) {
            operandA = returnActiveOperand();
            updateValueField(activeValueField, 'clear');
            displayCurrentValues()
        }
        displayActive.textContent = keypress;
        
    } else {
        updateValueField(activeValueField, keypress);
        updateValueField(historicValueField, keypress);
        displayCurrentValues()
    }
    
}

function displayCurrentValues() {
    displayActive.textContent = activeValueField.join('');
    displayHistoric.textContent = historicValueField.join('');
}

function returnActiveOperand() {
    return activeValueField.join('');
}

function updateValueField(valueField, valuePassed) {
    if (valuePassed === 'clear') {
        valueField.length = 0;
    } else if (valuePassed === 'delete') {
        valueField.pop();
    } else if ((valuePassed === '+' 
        || valuePassed === '-'
        || valuePassed === '*'
        || valuePassed === '/') && activeValueField.length === 0 && historicValueField === 0) {
            return
    } else if (valuePassed === '+' 
        || valuePassed === '-'
        || valuePassed === '*'
        || valuePassed === '/') {
            if (operands.find((op) => op === valueField[valueField.length - 1])) {
                console.log("i popped")
                valueField.pop()
                valueField.push(valuePassed)
            } else valueField.push(valuePassed)
    } else if (valuePassed === '.') {
        if (!valueField.find((value) => value === '.')) {
            valueField.push(valuePassed);
        }; 
    } else if (Array.isArray(valuePassed)) {
        valueField.push(...valuePassed);
      
    } else {
        valueField.push(valuePassed)
    }
    console.log(valueField)
}