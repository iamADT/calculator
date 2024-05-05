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

let firstNum;
let operator;
let secondNum;

function operate(firstNum, operator, secondNum){
    if(operator === "+"){
        addNumbers(firstNum, secondNum);
    }
    else if(operator === "-"){
        subtractNumbers(firstNum, secondNum)
    }
    else if(operator === "x"){
        multiplyNumbers(firstNum, secondNum)
    }
    else if(operator === "÷"){
        divideNumbers(firstNum, secondNum)
    }
}


const numbers = document.querySelectorAll(".number");
const screen = document.querySelector(".calculator-screen")

numbers.forEach(button =>
    button.addEventListener("click", function(){
        const numDiv = document.createElement("div");
        numDiv.textContent = this.textContent;
        numDiv.style.display = "inline-block";
        screen.appendChild(numDiv);
        adjustFontSize(screen);
        screen.scrollLeft = screen.scrollWidth;
   })
)

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
