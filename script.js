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
const display = document.querySelector('.display');
const displayExpression = display.querySelector('#displayExpression');
const displayResult = display.querySelector('#displayResult');

// Use regex to match everything thats not a number and split into an array
function getValues(index) {
  const expression = displayExpression.textContent.split(/[^0-9.]/g);
  return parseInt(expression[index], 10);
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

// function updateDisplayResult(result) {
//   displayResult.textContent = result;
// }

const currentExpression = {};
let numberOfTerms = 0;

const grid = document.querySelector('.grid');
grid.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn--operator')) {
    if (currentExpression.currentNum) currentExpression.previousNum = currentExpression.currentNum;
    currentExpression.currentNum = getValues(numberOfTerms);
    if (displayResult.textContent !== '0') currentExpression.previousNum = displayResult.textContent;
    if (currentExpression.previousNum && currentExpression.currentNum) displayResult.textContent = operate(currentExpression.previousNum, currentExpression.operator, currentExpression.currentNum);
    currentExpression.operator = e.target.value;
    numberOfTerms += 1;
  }
  updateDisplayExpression(e);
});

// Get the first and second number then pass onto operate function
const buttonResult = grid.querySelector('#buttonResult');
buttonResult.addEventListener('click', () => {
  // displayResult.textContent = operate(currentExpression.previousNum, currentExpression.operator, currentExpression.currentNum);
});
