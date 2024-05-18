function addNumbers(...nums){
    return nums.reduce((total, num) => total + parseFloat(num, 10), 0);
}

function subtractNumbers(...nums){
    return nums.reduce((total, num) => total - parseFloat(num, 10));
}

function multiplyNumbers(...nums){
    return nums.reduce((total, num) => total * num, 1);
}

function divideNumbers(...nums){
    return nums.reduce((total, num) => {
        if(num !== 0){
            return total/num
        }
        else { 
            return "error, cannot do division"
        }
        })
}

function simpleOperate(total, operator, num){
    switch(operator) {
        case '+': return parseFloat(total + num);
        case '-': return total - num;
        case 'x': return total * num;
        case '÷': return num !== 0 ? total / num : "sorry cannot divide by zero";
        default: return total;
    }
}

const screen = document.querySelector(".calculator-screen");
const numbers = document.querySelectorAll(".number");
const operatorKey = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const allClear = document.querySelector(".all-clear");
const clearEntry = document.querySelector(".clear-entry");
const decimalPoint = document.querySelector(".decimal");

let num = null;
let operator;
let currentNum = '';
let currentExpression = [];

//Adding each key as a div to the screen
function appendToScreen(keyPressed, isResult = false){
    let expression = screen.querySelector(".expression");
    const keyValue = document.createElement("div");
    keyValue.textContent = keyPressed;

    
    if (keyPressed && isResult == false){
        expression.appendChild(keyValue);
    }
    
    if (isResult){
        let result = screen.querySelector(".result");
        result.appendChild(keyValue)
        keyValue.className = "result"
    }
    
}

numbers.forEach(button =>
    button.addEventListener("click", function(){
        appendToScreen(this.textContent);
        adjustFontSize(screen);
        screen.scrollLeft = screen.scrollWidth;
        currentExpression.push(this.textContent);
   })
)

operatorKey.forEach(button =>
    button.addEventListener("click", function(){
        if(currentExpression.length > 0 && !isNaN(currentExpression[currentExpression.length - 1])) {
            appendToScreen(this.textContent);
            adjustFontSize(screen);
            screen.scrollLeft = screen.scrollWidth;
            currentExpression.push(this.textContent);
        } else if (this.textContent === '-' && currentExpression.length === 0) {
            // Allow a minus sign as the first character to support negative numbers
            appendToScreen(this.textContent);
            adjustFontSize(screen);
            screen.scrollLeft = screen.scrollWidth;
            currentExpression.push(this.textContent);
        } else {
            alert("Please start with a number first.");
        }
    })
)

decimalPoint.addEventListener("click", function() {
    // Determine if the current expression ends with a number (possibly including a decimal)
    let currentNumber = '';
    for (let i = currentExpression.length - 1; i >= 0; i--) {
        if (isNaN(currentExpression[i]) && currentExpression[i] !== '.') {
            break; // Stop at the first non-number and non-decimal character
        }
        currentNumber = currentExpression[i] + currentNumber;
    }

    // Check if the current number already contains a decimal
    if (!currentNumber.includes('.')) {
        if (currentNumber === '') {
            // If there's no current number, start a new one with '0.'
            appendToScreen('0.');
            currentExpression.push('0', '.');
        } else {
            // Otherwise, just add a decimal to the existing number
            appendToScreen('.');
            currentExpression.push('.');
        }
    } else {
        // If the current number already has a decimal, do nothing
    }
    adjustFontSize(screen);
    screen.scrollLeft = screen.scrollWidth;
});


equals.addEventListener("click", function() {
    let result = 0;
    let currentNumber = '';
    let lastOperator = '+';
    let isNewNumber = true;  // Added to track if we are starting a new number

    currentExpression.forEach(token => {
        if(isNaN(parseInt(token)) && token !== '.') {  // If it is an operator
            if (token === '-' && isNewNumber) {
                currentNumber = token; // Start a negative number
                isNewNumber = false; 
            } else {
                if (currentNumber !== '') { // There's a number to operate on
                    result = simpleOperate(parseFloat(result), lastOperator, parseFloat(currentNumber));
                    currentNumber = '';
                }
                lastOperator = token;
                isNewNumber = true; // Next token could be the start of a new number
            }
        } else { // It's a number
            currentNumber += token;
            isNewNumber = false;  // Continue the current number
        }
    });

    if(currentNumber !== '') {  // If there's any leftover number to process
        result = simpleOperate(parseFloat(result), lastOperator, parseFloat(currentNumber));
    }
    
    appendToScreen('=', true);
    appendToScreen(result.toString(), true);
    currentExpression = []; // Clear the expression after calculation
});




// This adjusts the font size when the numbers start to fill up the screen
function adjustFontSize(screen) {
    const maxChars = 10;
    const contentLength = screen.textContent.length;
    if (contentLength > maxChars) {
        const fontSize = Math.max(20, 40 - contentLength);
        screen.style.fontSize = `${fontSize}px`;
    } else {
        screen.style.fontSize = '40px';
    }
}


allClear.addEventListener("click", function(){
    screen.querySelector(".expression").textContent = '';
    screen.querySelector(".result").textContent = '';
    currentExpression = [];
})

clearEntry.addEventListener("click", function(){
    screen.removeChild(screen.lastChild)
})




