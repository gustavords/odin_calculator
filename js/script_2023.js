/**
 * must do's:
 *  + create calc functions:
 *      - add, multiply, subtract, divide 
 *      - operate, takes operator and 2 numbers and performs on of the above functions
 *      
 * + create simple html calculator
 *      - must have operators +,-,*,/
 *      - equals and clear button
 * 
 * + create display functions:
 *      - display pressed buttons function
 * 
 * + create logic functions:
 *      - calculations should happen once at a time, 12 + 7 - 5 * 3 = should yield 42.
 *      - calculation should happen and be displayed when the third number is pressed
 * 
 */

//Pseudo Code 1.0


let firstNum;
let secondNum;
let operator;

const add = (a, b) => { return a + b };
const subtract = (a, b) => { return a - b };
const multiply = (a, b) => { return a * b };
const divide = (a, b) => { return a / b };

function operate(firstNum, operate, secondNum) {
    switch (operate) {
        case `+`:
            return add(firstNum, secondNum);
        case `-`:
            return subtract(firstNum, secondNum);
        case `*`:
            return multiply(firstNum, secondNum);
        case `/`:
            return divide(firstNum, secondNum);
        default:
            return `error`;
    }
}


let displayValue = ``;
const display = document.getElementById(`calc-display`);
const numbers = document.getElementsByClassName(`numBtn`);

for(let button of numbers){
    button.addEventListener(`click`, () =>{

        display.textContent += button.textContent;
        displayValue = display.textContent;
        console.log(displayValue);
    });
}

// console.log(
//     `add(5,5) = ${add(5, 5)}
// subtract(4,5) = ${subtract(4, 5)}
// multiply(5,5) = ${multiply(5, 5)}
// divide(100,5) = ${divide(100, 5)}
// `);

// console.log(
//     `operate(5,"+",5) = ${operate(5, "+", 5)}
// operate(4,"-",5) = ${operate(4, "-", 5)}
// operate(5,"*",5) = ${operate(5, "*", 5)}
// operate(100,"/",5) = ${operate(100, "/", 5)}
// operate(5,"",5) = ${operate(5, "", 5)}
// `);