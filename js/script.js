const display = document.querySelector(`.cal-display-item`);
const buttons = document.querySelectorAll(`button`);
const numBtns = document.querySelectorAll(`.num`);

let currentValue = ``;
let buttonValuePressed = ``;
let displayText = ``;
let value = 0;
let oprtrArr = [];

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
      blockAllNumBtn(true); ///TODO:this is a bad function change it

      console.log(`worked`);
    } else {
      display.textContent = displayText;
    }

    console.log(`currentValue.length: ${currentValue.length}`);
    console.log(`displayText.length: ${displayText.length}`);
  });
});


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
      case `*`:
        mul();
        break;
      case `/`:
        div();
        break;
      case `%`:
        mod();
        break;
      case `+/-`:
        signum();
        break;
      case "=":
        equals();
        break;
      default:
        console.log(`e.target.textContent:${e.target.textContent} was pressed`);
    }
  });
});

function clearDisplay() {
  display.textContent = ``;
  currentValue = ``;
}

function add() {
  if (value === 0) {
    value = +currentValue;
    currentValue = ``;
  } else if (oprtrArr[oprtrArr.length - 1] != `+`) {
    equals();
  } else {
    value += +currentValue;
    display.textContent = `${value}`;
    currentValue = ``;
  }
  oprtrArr.push(`+`);
  console.log(`value:${value}`);
}

function sub() {
  if (value === 0) {
    value = +currentValue;
    currentValue = ``;
  } else if (oprtrArr[oprtrArr.length - 1] != `-`) {
    equals();
  } else {
    value -= +currentValue;
    display.textContent = `${isMoreThan10Digits(value)}`;
    currentValue = ``;
  }
  oprtrArr.push(`-`);
  console.log(`value:${value}`);
}

function mul() {
  if (value === 0) {
    value = +currentValue;
    currentValue = ``;
  } else if (oprtrArr[oprtrArr.length - 1] != `*`) {
    equals();
  } else {
    value *= +currentValue;
    display.textContent = `${isMoreThan10Digits(value)}`;
    currentValue = ``;
  }
  oprtrArr.push(`*`);
}

function div() {
  if (value === 0) {
    value = +currentValue;
    currentValue = ``;
  } else if (oprtrArr[oprtrArr.length - 1] != `/`) {
    equals();
  } else {
    value /= +currentValue;
    display.textContent = `${isMoreThan10Digits(value)}`;
    currentValue = ``;
  }
  oprtrArr.push(`/`);
}

function mod() {
  if (value === 0) {
    value = +currentValue;
    currentValue = ``;
  } else if (oprtrArr[oprtrArr.length - 1] != `%`) {
    equals();
  } else {
    value %= +currentValue;
    display.textContent = `${isMoreThan10Digits(value)}`;
    currentValue = ``;
  }
  oprtrArr.push(`%`);
}

function equals() {
  switch (oprtrArr[oprtrArr.length - 1]) {
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
  oprtrArr = [];
  return (equalWasPressed = false);
}

function signum() {
  currentValue = currentValue * -1;
  display.textContent = `${currentValue}`;
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
  // reset add oprtrArr
  oprtrArr = [];
  value = 0;
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
    document.querySelector(
      `.cal-point-item`
    ).style.cssText = `color: orange; background-color: var(--purple-o);`;
  }
}

//only 10 digits fit in the display window
function isMoreThan10Digits(value) {
  return value.toString().length > 9 ? value.toExponential(4) : value;
}
