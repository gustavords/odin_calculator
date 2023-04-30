const calcArr = [];
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

let displayHistory = ``;
let pressed = ``;
// let firstNum;
// let secondNum;
let operator;

/**
 * TODO: turn into an operations object
 *
 */
const add = (a, b) => {
	return a + b;
};
const subtract = (a, b) => {
	return a - b;
};
const multiply = (a, b) => {
	return a * b;
};
const divide = (a, b) => {
	if (a === 0 && b === 0) return `you can't do that silly, error`;
	return a / b;
};
const modulus = (a, b) => {
	return a % b;
};

/**
 * TODO: make history work for multiple numbers pressed
 */
//event for displays pressed numbers
for (let button of numbers) {
	button.addEventListener(`click`, () => {
		//removes text
		text.textContent = ``;
		//creates a string with all numbers pressed
		pressed += button.textContent;
		//displays to display
		text.textContent = pressed;
		//re-enables operation buttons

		//might go
		// history.textContent += pressed + ` `;

		disableBtn(opr, false);
	});
}

//does all operations
/**
 * TODO:
 * -possibly place most of it into a calculate function,
 * and just let the event focus on the display
 * - fix the . and operator sequence issue that returns NaN
 */
for (let button of operations) {
	button.addEventListener(`click`, () => {
		deciBtn.disabled = false;

		//clears pressed buttons
		pressed = ``;

		//for array after equals is used
		if (calcArr.length === 1) {
			calcArr.splice(0, 1);
			console.log(calcArr);
		}

		//pushes value into array
		calcArr.push(text.textContent);

		if (
			button.textContent == `+` ||
			button.textContent == `-` ||
			button.textContent == `*` ||
			button.textContent == `/` ||
			button.textContent == `%`
		) {
			calcArr.push(button.textContent);
			disableBtn(opr, true);
		}

		calculate();

		//appends to history display
		//might come off
		// if (
		// 	button.textContent == `+` ||
		// 	button.textContent == `-` ||
		// 	button.textContent == `*` ||
		// 	button.textContent == `/`
		// ) {
		// history.textContent += button.textContent + ` `;
		// }
	});
}
signBtn.onclick = () => {
	// +text.textContent > 0 ? +text.textContent * -1 : +text.textContent * 1;
	text.textContent = +text.textContent * -1;
};

deciBtn.onclick = () => {
	deciBtn.disabled = true;
};

clearBtn.onclick = () => {
	history.textContent = ``;
	text.textContent = ``;
};

delBtn.onclick = () => {
	text.textContent = ``;
	//mightgo
	// history.textContent += `, `;
};

function disableBtn(collection, boolean) {
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

function calculate() {
	///equals only works since this is always called in the event
	if (calcArr.length > 2) {
		calcArr.push(operate(calcArr[0], calcArr[1], calcArr[2]));
		calcArr.splice(0, 3);
		calcArr.reverse();
		text.textContent = calcArr[0];
		// history.textContent += `= ` + calcArr[0] + ` `;
		// console.log(calcArr);
	}
}
