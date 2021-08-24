let previousTerm;
let currentTerm;
let operatorValue;

const calculator = document.querySelector('.calculator');
const errorMessage = document.createElement('p');
errorMessage.textContent = "Don't divide by 0!";
errorMessage.classList.add('calculator__top--hidden');
const calculatorTop = calculator.querySelector('.calculator__top');
calculatorTop.appendChild(errorMessage);

const display = document.querySelector('.display');
const displayExpression = display.querySelector('#displayExpression');
const displayResult = display.querySelector('#displayResult');

// Functions
function resetCalculator() {
  errorMessage.classList.add('calculator__top--hidden');
  const buttonDecimal = document.querySelector('#buttonDecimal');
  toggleButton(buttonDecimal, false);
  displayExpression.textContent = 0;
  displayResult.textContent = 0;
  previousTerm = 0;
  operatorValue = '';
  currentTerm = 0;
}

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
  if (parseFloat(firstNum) === 0 || parseFloat(secondNum) === 0) errorMessage.classList.remove('calculator__top--hidden');
  else errorMessage.classList.add('calculator__top--hidden');

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
      break;
  }
  return result.toFixed(2).replace(/[.,]00$/, '');
}

// Use regex to match everything thats not a number and split into an array
function getValues(array, index) {
  return parseFloat(array[index], 10);
}

function checkOperator() {
  const ifOperatorExists = displayExpression.textContent.match(/[^0-9.]/g);
  return !!ifOperatorExists;
}

function toggleResultButton() {
  const buttonResult = document.querySelector('#buttonResult');
  buttonResult.disabled = true;
  if (currentTerm && previousTerm) buttonResult.disabled = false;
}

function calculateCurrentExpression() {
  errorMessage.classList.add('calculator__top--hidden');
  const expression = displayExpression.textContent.replace('', '').split(/[^0-9.]/g);
  currentTerm = getValues(expression, expression.length - 1);
  if (checkOperator()) {
    previousTerm = getValues(expression, expression.length - 2);
    currentTerm = getValues(expression, expression.length - 1);
    if (previousTerm || currentTerm) displayResult.textContent = operate(previousTerm, operatorValue, currentTerm);
  }
  toggleResultButton();
}

function toggleButton(button, isActive) {
  if (isActive) {
    button.disabled = true;
    button.classList.add('btn--disabled');
  } else {
    button.disabled = false;
    button.classList.remove('btn--disabled');
  }
}

function deleteValue() {
  if (displayExpression.textContent.length > 1) displayExpression.textContent = displayExpression.textContent.slice(0, -1);
  else displayExpression.textContent = 0;
  calculateCurrentExpression();
  if (displayResult.textContent === 'NaN') displayResult.textContent = '0';
}

function displayValue(value) {
  if (displayExpression.textContent === '0') displayExpression.textContent = value;
  else displayExpression.textContent += value;
}

function displayOperator(operator) {
  if (displayResult.textContent !== '0') {
    if (checkOperator()) displayExpression.textContent = displayResult.textContent;
    else displayExpression.textContent = currentTerm;
  }
  displayExpression.textContent += `${operator}`;
}

function updateDisplay(e) {
  if (e.target.classList.contains('btn--number') || e.target.id === 'buttonDecimal') displayValue(e.target.value);
  else if (e.target.classList.contains('btn--operator')) displayOperator(e.target.textContent);
}

// DOM elements
const grid = document.querySelector('.grid');
grid.addEventListener('click', (e) => {
  updateDisplay(e);
  if (!e.target.classList.contains('btn')) return;
  const buttonOperators = document.querySelectorAll('.btn--operator');
  const arrButtonOperators = [...buttonOperators];
  arrButtonOperators.map((button) => toggleButton(button, false));
  if (e.target.id === 'buttonClear') {
    resetCalculator();
  }
  if (e.target.classList.contains('btn--operator')) {
    operatorValue = e.target.value;
    arrButtonOperators.map((button) => toggleButton(button, true));
    const buttonDecimal = document.querySelector('#buttonDecimal');
    toggleButton(buttonDecimal, false);
  }
  if (e.target.classList.contains('btn--number')) {
    calculateCurrentExpression();
  }
});

// Get the first and second number then pass onto operate function
const buttonResult = grid.querySelector('#buttonResult');
buttonResult.addEventListener('click', () => {
  displayExpression.textContent = displayResult.textContent;
  currentTerm = parseFloat(displayResult.textContent, 10);
});

const buttonDecimal = grid.querySelector('#buttonDecimal');
buttonDecimal.addEventListener('click', (e) => {
  toggleButton(e.target, true);
});

const buttonBackspace = grid.querySelector('#buttonBackspace');
buttonBackspace.addEventListener('click', () => {
  deleteValue();
});

document.addEventListener('keydown', (e) => {
  if (e.key.match(/^\d+$/)) {
    displayValue(e.key);
    calculateCurrentExpression();
  }

  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    switch (e.key) {
      case '+': {
        operatorValue = 'add';
        break;
      }

      case '-': {
        operatorValue = 'subtract';
        break;
      }

      case '*': {
        operatorValue = 'multiply';
        break;
      }

      case '/': {
        operatorValue = 'divide';
        break;
      }
      default: {
        break;
      }
    }
    displayOperator(e.key);
  } else if (e.key === 'Enter') {
    displayExpression.textContent = displayResult.textContent;
    currentTerm = parseFloat(displayResult.textContent, 10);
  } else if (e.key === 'Backspace') deleteValue();
});
