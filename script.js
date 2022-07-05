const display = document.querySelector(`.cal-display-item`);
const buttons = document.querySelectorAll(`button`);
const numBtns = document.querySelectorAll(`.num`);
let text = ``;

numBtns.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    let displayText = e.target.textContent; //what is actually pressed
    console.log(`displayText: ${displayText}`);

    // takes in current display
    text += displayText;
    console.log(`text: ${text}`);

    //remove display text
    if (display.textContent === `Display`) {
      display.textContent = ``;
    }

    //limit numbers entered
    if (text.length > 9) {
      buttons.disabled = true;

      //blocks buttons
      blockAllNumBtn(true);

      console.log(`worked`);
    } else {
      display.textContent += displayText;
    }

    console.log(`text.length: ${text.length}`);
    console.log(`displayText.length: ${displayText.length}`);
  });
});

buttons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    // console.log(e.target);
    //Delete Button
    if (e.target.textContent === `Del`) delBtn();
    //A/C Button
    if (e.target.textContent === `A/C`) acBtn();

    if (e.target.textContent === `+`) addBtn();

    if (e.target.textContent === `=`) {
      equalBtnPressed();
    }
  });
});

let addBtnPressed = false;
let calcArr = [];
let currentCalc;

function addBtn() {
  //erases display
  text = display.textContent;
  console.log(text);
  console.log(display.textContent);
  console.log(currentCalc);

  display.textContent = ` `;
  display.textContent = ` `;

  //cahnge background colour to notice its pressed
  document.querySelector(
    `.cal-plus-item`
  ).style.cssText = `background-color: var(--grey-o);`;

  //converst text to num
  text = +text;

  //tells add-button is pressed
  addBtnPressed = true;

  // console.log(`to num: ${typeof text} text: ${text}`);

  calcArr.push(text);
  text = ``;
  console.log(calcArr);
  if (calcArr.length === 2) {
    display.textContent = ``;
    currentCalc = `${calcArr[0] + calcArr[1]}`;

    console.log(`currentCalc: ${currentCalc}`);
    display.textContent = `${currentCalc}`;
    calcArr = [];
    calcArr.push(+currentCalc);
    addBtnPressed = false;
    console.log(
      `currentCalc:${currentCalc}, calcArr[0]:${
        calcArr[0]
      }, +display.textContent:${+display.textContent}`
    );

    
  }
  // display.textContent = ``;
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
  text = ``;
  blockAllNumBtn(false);
}

function acBtn() {
  display.textContent = ``;
  text = ``;
  blockAllNumBtn(false);
  // reset add array
  calcArr = [];
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
