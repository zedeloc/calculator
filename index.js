// MUST FIGURE OUT HOW TO HAVE NEGATIVE second OPERAND


//global variables
const operators = ['+', '-', '*', '/']
let activeValueField = '';
let returnedOperator = false
const displayActive = document.querySelector("#display-active");
const keys = Array.from(document.querySelectorAll(".key"));

// functions start

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

function operate(a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a ,b);
    };
};

keys.forEach((key) => key.addEventListener("click", () => {
    evaluateKeystroke(key.id);
    }
))

function detectLeadingNegativeOperand(){

}

function attemptOperation() {
    if (evaluateEqualValidity()) {
        let answer = getAnswer()
        if (answer === "FATAL ERROR: 666") {
            activeValueField = '';
            returnedOperator = false;
            displayActive.textContent = answer;
            return
        }else { 
            answer = Math.round(answer * 100000) / 100000;
            activeValueField = "" + answer;
            displayActive.textContent = activeValueField;
            returnedOperator = true
        }
        
    }
}

function evaluateKeystroke(keystroke) {
    if (keystroke === 'clear') {
        clearAll();
    } else if (keystroke === "delete") {
        backspace();
    } else if (keystroke === '=') {
        attemptOperation();
    } else if(operators.find((op) => keystroke === op)) {
        evaluateOperators(keystroke);
    } else if (keystroke === '.') {
        evaluateDecimalValidity(keystroke)
    } else enterKeystroke(keystroke);
}

function evaluateDecimalValidity(keystroke) {
    if ((activeValueField.lastIndexOf(".") > -1) && findOperator(activeValueField)) {
        let theDecimalIndex = activeValueField.lastIndexOf(".");
        let theOperatorIndex = activeValueField.indexOf(findOperator(activeValueField));
        if (theOperatorIndex > theDecimalIndex) {
            enterKeystroke(keystroke);
        } else {
            console.log("Illegal decimal input averted, (with operator present)")
            return false
        }
    } else if (activeValueField.lastIndexOf(".") > -1) {
        console.log("Illegal decimal input averted")
        return false
    } else enterKeystroke(keystroke);
}

function evaluateOperators(keystrokeOp) {
    // fix accidental multiple operators if you choose a negative after an operator and then change it
    if (keystrokeOp === '-') {
        if (activeValueField.length === 0) {
            enterKeystroke(keystrokeOp);
        } else if (activeValueField.slice(-1) === '-' && activeValueField.slice(-2, -1) === '-') {
            console.log("Attempt to input 3 negative symbols in a row averted");
            return;
        }
        
        else if (findOperator(activeValueField) === activeValueField.slice(-1)) {
            enterKeystroke(keystrokeOp)
        }
    }

    if (activeValueField.length === 0) {
        console.log("Attempt to input operator before operand averted.");
        return;
    } else if (activeValueField.slice(-1) === '-' && (activeValueField.length === 1)) {
        console.log("Mistaking --FIRST-- leading negative for operator averted.");
        return;
    } else if (activeValueField.slice(-1) === '-' && (activeValueField.slice(-2, -1) === findOperator(activeValueField))) {
        console.log("Mistaking --SECOND-- leading negative for operator averted.");
        return;
    } else if (operators.find((op) => op === activeValueField.slice(-1))) {
        backspace();
        enterKeystroke(keystrokeOp);
        console.log("Operator replaced.");
    } else if (findOperator(activeValueField) && (findOperator(activeValueField) !== activeValueField.slice(0, 1))) {
        console.log("Attempt to enter second operator averted")
        return;
    } else {
        returnedOperator = false;
        enterKeystroke(keystrokeOp)
    };
}

function enterKeystroke(keystroke) {
    if (returnedOperator) {
        console.log(`Illegal attempt to input digits averted. Returned operator : ${returnedOperator}`)
        return;
    } else {
        activeValueField += keystroke;
        displayActive.textContent = activeValueField;
    }  
}

function clearAll() {
    activeValueField = '';
    displayActive.textContent = activeValueField;
    returnedOperator = false;
}

function backspace() {
    if (returnedOperator === true) {
        clearAll();
    } else {
        activeValueField = activeValueField.slice(0, -1);
        displayActive.textContent = activeValueField;
    }
}

function splitEquationString(str) {
    let theIndex;
    if (str.slice(0, 1) === '-') {
        let stripLeadingNegative = str.slice(1);
        theIndex = stripLeadingNegative.indexOf(findOperator(stripLeadingNegative)) + 1;
    } else {
        theIndex = str.indexOf(findOperator(str));
    }
    let ops = [str.slice(0, theIndex), 
        str.slice(theIndex, (theIndex + 1)), 
        str.slice(theIndex + 1)];
    return ops
}

function evaluateEqualValidity() {
    if (activeValueField.length === 0) {
        return false;
    } else if ((splitEquationString(activeValueField)[2].length > 0) && findOperator(activeValueField)) {
        // console.log(splitEquationString(activeValueField)[2]);
        return true
    } else console.log("Something weird happened while evaluating equal sign validity. Neither true nor false");
}

function findOperator(str) {
    let i = 0;
    for (let char of str) {
        for (let op of operators) {
            if (op === char && i !== 0) {
                return char;
            }
        }  
        i++  
    }
    return null
}

function getAnswer() {
    if (findOperator(activeValueField)) {
        let ops = splitEquationString(activeValueField);
        if (ops[2]) {
            return operate(ops[0], ops[2], ops[1]);
        }
    } else {
        console.log(`Incomplete Equation:"activeValueField = ${activeValueField}"`);
        return;
    
    };
}