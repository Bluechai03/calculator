function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

function operate(firstNum, operator, secondNum) {
  let result;
  switch (operator) {
    case 'add':
      result = add(firstNum, secondNum);
      break;
    case 'subtract':
      result = subtract(firstNum, secondNum);
      break;
    case 'multiply':
      result = multiply(firstNum, secondNum);
      break;
    case 'divide':
      result = divide(firstNum, secondNum);
      break;
    default:
      return console.log('errorrrr');
  }
  return result;
}
// Use reduce to calculate values if its an array

// Store the values into firstNum variable once an operator is pressed and save the operator itself
// When '=' is pressed, save values before it into secondNum
const display = document.querySelector('.display');
const displayExpression = display.querySelector('#displayExpression');
const displayResult = display.querySelector('#displayResult');

// If theres an operator inside textContent, split it and return the numbers after the operator
// Use regex to match everything thats not a number and split it
function getValues(index) {
  const array = displayExpression.textContent.split(/[^0-9.]/g);
  return parseInt(array[index], 10);
}

function updateDisplayExpression(e) {
  if (e.target.classList.contains('btn--number')) {
    if (displayExpression.textContent === '0') displayExpression.textContent = e.target.value;
    else displayExpression.textContent += e.target.value;
  } else if (e.target.classList.contains('btn--operator')) {
    displayExpression.textContent += e.target.textContent;
  }
  if (e.target.id === 'buttonClear') {
    displayExpression.textContent = 0;
    displayResult.textContent = 0;
  }
}

function updateDisplayResult(result) {
  displayResult.textContent = result;
}

let operator;
let firstNum;
let secondNum;
// const numbers = [firstNum, secondNum];

const grid = document.querySelector('.grid');
grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn--operator')) {
    firstNum = getValues(0);
    operator = e.target.value;
  }
  updateDisplayExpression(e);
});

// Get the first and second number then pass onto operate function
const buttonResult = grid.querySelector('#buttonResult');
buttonResult.addEventListener('click', () => {
  // Split the expression to get operator and second value
  secondNum = getValues(1);
  const result = operate(firstNum, operator, secondNum);
  updateDisplayResult(result);
});
