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
  switch (operator) {
    case 'add':
      return add(firstNum, secondNum);
    case 'subtract':
      return subtract(firstNum, secondNum);
    case 'multiply':
      return multiply(firstNum, secondNum);
    case 'divide':
      return divide(firstNum, secondNum);
    default:
      return console.log('errorrrr');
  }
  updateDisplay();
}

// Problem:
// Figure out how to store firstNum, secondNum and operator from user input

// Solutions:
// With every number pressed before an operator is pressed, save them in firstNum
// Once an operator is pressed, save the numbers after it as second sum

// Use reduce to calculate values if its an array

// Store the values into firstNum variable once an operator is pressed and save the operator itself
// When '=' is pressed, save values before it into secondNum

function getValues(e, number) {
  if (!number) number = e.target.value;
  else number += e.target.value;
  return parseInt(number, 10);
}

function updateDisplay(e) {
  const display = document.querySelector('.display');
  const displayExpression = display.querySelector('#displayExpression');
  if (e.target.classList.contains('btn--number')) {
    if (displayExpression.textContent === '0') displayExpression.textContent = e.target.value;
    else displayExpression.textContent += e.target.value;
  } else if (e.target.classList.contains('btn--operator')) {
    displayExpression.textContent += e.target.textContent;
  }
  if (e.target.id === 'buttonClear') displayExpression.textContent = '0';
}

let operator;
let firstNum;
let secondNum;
// const numbers = [firstNum, secondNum];

const grid = document.querySelector('.grid');
grid.addEventListener('click', (e) => {
  updateDisplay(e);
});

// Get the first and second number then pass onto operate function
const result = grid.querySelector('#buttonResult');
result.addEventListener('click', () => operate(firstNum, operator, secondNum));
