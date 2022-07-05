const display = document.querySelector(`.cal-display-item`);
const buttons = document.querySelectorAll(`button`);
const numBtns = document.querySelectorAll(`.num`);

let currentValue = ``;
let buttonValuePressed = ``;
let displayText = ``;
let valueA = 0;

let equalWasPressed = false;

//eventlistener for the number buttons
numBtns.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    //clears screen after each press
    display.textContent = ``;

    buttonValuePressed = e.target.textContent; //the value of what is actually pressed
    console.log(`buttonValuePressed:${buttonValuePressed}`);

    // takes in current button pressed and adds to string
    currentValue += buttonValuePressed;
    console.log(`currentValue: ${currentValue}`);

    displayText = currentValue; //WILL GO to display
    console.log(`displayText: ${displayText}`);

    //remove display text
    if (display.textContent === `Display`) {
      display.textContent = ``;
    }

    //limit numbers entered
    if (currentValue.length > 9) {
      buttons.disabled = true;

      //blocks buttons
      blockAllNumBtn(true);

      console.log(`worked`);
    } else {
      display.textContent = displayText;
    }

    console.log(`currentValue.length: ${currentValue.length}`);
    console.log(`displayText.length: ${displayText.length}`);
  });
});

console.log(`currentValue: ${currentValue}`);

//event listener for operator buttons
buttons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    // console.log(e.target);

    //TODO:turn into a switch
    switch (e.target.textContent) {
      case `Del`:
        delBtn();
        break;
      case `A/C`:
        acBtn();
        break;
      case `+`:
        add();
        break;
      case "-":
        sub();
        break;
      case "=":
        equals();
        break;
      default:
        console.log(`e.target.textContent:${e.target.textContent} was pressed`);
    }

    // if (e.target.textContent === `=`) {
    //   console.log(`equalWasPressed:${(equalWasPressed = true)} `);
    //   equals();
    //   console.log(`equalWasPressed:${equalWasPressed}`);
    //   // equalBtnPressed();
    // }
  });
});

function clearDisplay() {
  display.textContent = ``;
  currentValue = ``;
}

let array = [];

function add() {
  // array.push(`+`);

  // if (array[array.length - 1] === `+`) {
  //   console.log(` is + -> array[array.length-1]: ${array[array.length - 1]}`);
  // }

  if (valueA === 0) {
    valueA = +currentValue;
    currentValue = ``;
    // array.push(`+`);
  } else if (array[array.length - 1] != `+`) {
    console.log(
      ` is not + -> array[array.length-1]: ${array[array.length - 1]}`
    );
    console.log(`is not + -> valueA:${valueA}`);
    console.log(`is not + -> curretnValue:${currentValue}`);

    equals();
    // array.push(`+`);
  } else {
    // display.textContent = ``;
    valueA += +currentValue;
    display.textContent = `${valueA}`;
    currentValue = ``;
    // array.push(`+`);
    console.log(`in else + valueA:${valueA}`);
  }
  array.push(`+`);
  console.log(`valueA:${valueA}`);
}

function sub() {
  if (valueA === 0) {
    valueA = +currentValue;
    currentValue = ``;
    array.push(`-`);
  } else if (array[array.length - 1] != `-`) {
    console.log(
      ` is not - -> array[array.length-1]: ${array[array.length - 1]}`
    );
    console.log(`is not - -> valueA:${valueA}`);
    console.log(`is not - -> curretnValue:${currentValue}`);

    equals();
    array.push(`-`);
  } else {
    // display.textContent = ``;
    valueA -= +currentValue;
    display.textContent = `${valueA}`;
    currentValue = ``;
    array.push(`-`);
    console.log(`in else - valueA:${valueA}`);
  }

  console.log(`valueA:${valueA}`);
}

function mul() {}

function div() {}

function mod() {}

function equals() {
  switch (array[array.length - 1]) {
    case `+`:
      add();
      break;
    case `-`:
      sub();
      break;
    case `*`:
      mul();
      break;
    case `/`:
      div();
      break;
    case `%`:
      mod();
      break;
    default:
      console.log(`nothing ran`);
  }
  array = [];
  return (equalWasPressed = false);
}

function equalBtnPressed() {
  if (addBtnPressed === true) {
    console.log(
      `currentCalc:${currentCalc}, calcArr[0]:${
        calcArr[0]
      }, +display.textContent:${+display.textContent}`
    );
    currentCalc = `${calcArr[0] + +display.textContent}`;
    display.textContent = `${currentCalc}`;
    currentCalc = ``;
    calcArr = [];
    return (addBtnPressed = false);
  } else {
    console.log(`currentCalc: ${currentCalc}`);
  }
  // if(boolean){
  // currentCalc = ``;

  // }
  // return false;
}

function delBtn() {
  display.textContent = ``;
  currentValue = ``;
  //only if they hit 10 digits
  blockAllNumBtn(false);
}

function acBtn() {
  display.textContent = ``;
  currentValue = ``;
  blockAllNumBtn(false);
  // reset add array
  calcArr = [];

  valueA = 0;
}

function blockAllNumBtn(boolean) {
  if (boolean === true) {
    numBtns.forEach((x) => {
      x.style.cssText = `color: red; pointer-events: none; background-color: var(--grey-o);`;
    });
  } else {
    numBtns.forEach((x) => {
      x.style.cssText = `color: var(--white); background-color: var(--orange-o);`;
    });
  }
}

// function add() {}
