// const calcArr = [];
const display = document.getElementById(`calc-display`);
const text = document.getElementById(`text`);
const numbers = document.getElementsByClassName(`numBtn`);
const operations = document.getElementsByClassName(`oprBtn`);
const opr = document.getElementsByClassName(`opr`);
const history = document.getElementById(`history`);
const clearBtn = document.getElementById(`oprClr`);
const delBtn = document.getElementById(`oprDel`);
const deciBtn = document.getElementById(`oprDeci`);
const signBtn = document.getElementById(`oprSign`);

// let displayHistory = ``;
let pressed = ``;
// let firstNum = 0;
// let secondNum = 0;
let operator = ``;

const newCalcArr = [];

/**
 * TODO: turn into an operations object
 *
 */
const add = (a, b) => { return a + b; };
const subtract = (a, b) => { return a - b; };
const multiply = (a, b) => { return a * b; };
const divide = (a, b) => {
	if (a === 0 && b === 0) return `you can't do that silly, error`;
	return a / b;
};
const modulus = (a, b) => { return a % b; };

//event for displaying pressed numbers
for (let button of numbers) {
	button.addEventListener(`click`, () => {
		//removes text from display
		text.textContent = ``;
		//concatenates a string with all numbers pressed
		pressed += button.textContent;
		//displays to display
		text.textContent = pressed;
		//re-enables operation buttons
		disableBtns(opr, false);
	});
}

/**
 * TODO:
 * -possibly place most of it into a calculate function,
 * and just let the event focus on the display of the calculations
 */
//display the calculation to the display

for (let button of operations) {
	button.addEventListener(`click`, () => {
		//re-enables operation buttons
		deciBtn.disabled = false;

		//clears pressed buttons
		pressed = ``;

		//sends whats on screen to the array
		newCalcArr.push(text.textContent);

		/////HISTORY Display
		displayHistory(text.textContent);

		///error handling...................................
		if (typeof +newCalcArr[0] !== `number` || newCalcArr[0] == ``) {
			console.log(`not a number`);
			newCalcArr.length = 0;
		}

		//when operations buttons are pressed
		if (
			button.textContent == `+` ||
			button.textContent == `-` ||
			button.textContent == `*` ||
			button.textContent == `/` ||
			button.textContent == `%`
		) {
			disableBtns(opr, true);

			//calculates if user keeps going
			if (newCalcArr.length > 2) {
				calculate(newCalcArr);
				let temp = newCalcArr.splice(3, 3);
				newCalcArr.length = 0;
				newCalcArr[0] = temp;
				newCalcArr.push(button.textContent);
			} else {
				newCalcArr.push(button.textContent);
			}

			//displays button pressed into history
			displayHistory(button.textContent);

		}
		else if (button.textContent == `=`) {

			//after long string of calculation user wants total
			if (newCalcArr.length > 3) {
				calculate(newCalcArr);
				let temp = newCalcArr[4];
				newCalcArr.length = 0;
				newCalcArr[0] = temp;
				// console.log(newCalcArr);
			}

			//displays into history
			displayHistory(button.textContent);

			//last calculation, resets array
			newCalcArr.push(button.textContent);
			calculate(newCalcArr);
			displayHistory(newCalcArr[newCalcArr.length - 1] + ` `);
			newCalcArr.length = 0;
		}
	});
}

signBtn.onclick = () => {
	// +text.textContent > 0 ? +text.textContent * -1 : +text.textContent * 1;
	text.textContent = +text.textContent * -1;
};

deciBtn.onclick = () => {
	deciBtn.disabled = true;
	disableBtns(opr, true);
};

clearBtn.onclick = () => {
	history.textContent = ``;
	text.textContent = ``;
	pressed = ``;
	newCalcArr.length = 0;
	disableBtns(opr, false);
};

delBtn.onclick = () => {
	text.textContent = ``;
	pressed = ``;
};

function displayHistory(string) {
	history.textContent += string;
}

function disableBtns(collection, boolean) {
	if (boolean) {
		[...collection].forEach((btn) => {
			btn.disabled = true;
		});
	} else {
		[...collection].forEach((btn) => {
			btn.disabled = false;
		});
	}
}

/**
 * TODO: calculations should be rounded after certain decimal point
 */
function operate(firstNum, operator, secondNum) {
	firstNum = +firstNum;
	secondNum = +secondNum;

	switch (operator) {
		case `+`:
			return add(firstNum, secondNum);
		case `-`:
			return subtract(firstNum, secondNum);
		case `*`:
			return multiply(firstNum, secondNum);
		case `/`:
			return divide(firstNum, secondNum);
		case `%`:
			return modulus(firstNum, secondNum);
		default:
			return `error`;
	}
}

function calculate(array) {
	array.push(operate(array[0], array[1], array[2]));
	text.textContent = array[array.length - 1];
	console.log(`newCalcArr --> ${array}`);
}
