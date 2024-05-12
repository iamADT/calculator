function addNumbers(...nums){
    return nums.reduce((total, num) => total + parseInt(num, 10), 0);
}

function subtractNumbers(...nums){
    return nums.reduce((total, num) => total - parseInt(num, 10));
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
        case '+': return total + num;
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
        currentExpression.push(this.textContent)
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


equals.addEventListener("click", function() {
    let result = 0;
    let currentNumber = '';
    let lastOperator = '+';
    let isNewNumber = true;  // Added to track if we are starting a new number

    currentExpression.forEach(token => {
        if(isNaN(parseInt(token))) {  // If it is an operator
            if (token === '-' && isNewNumber) {
                currentNumber = token; // Start a negative number
                isNewNumber = false;   // Now we're not starting a new number anymore
            } else {
                if (currentNumber !== '') { // There's a number to operate on
                    result = simpleOperate(result, lastOperator, parseInt(currentNumber));
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
        result = simpleOperate(result, lastOperator, parseInt(currentNumber));
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
})

clearEntry.addEventListener("click", function(){
    screen.removeChild(screen.lastChild)
})




