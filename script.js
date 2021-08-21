let previousTerm;
let currentTerm;
let operator;

const display = document.querySelector('.display');
const displayExpression = display.querySelector('#displayExpression');
const displayResult = display.querySelector('#displayResult');

// Functions
function resetCalculator() {
  const buttonDecimal = document.querySelector('#buttonDecimal');
  buttonDecimal.disabled = false;
  displayExpression.textContent = 0;
  displayResult.textContent = 0;
  previousTerm = 0;
  operator = '';
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
  if (parseInt(firstNum, 10) === 0 || parseInt(secondNum, 10) === 0) {
    alert("Don't divide by 0!");
    resetCalculator();
    return 0;
  }
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

function calculateCurrentExpression() {
  if (checkOperator()) {
    const expression = displayExpression.textContent.replace('', '').split(/[^0-9.]/g);
    previousTerm = getValues(expression, expression.length - 2);
    currentTerm = getValues(expression, expression.length - 1);
    if (previousTerm || currentTerm) displayResult.textContent = operate(previousTerm, operator, currentTerm);
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
    displayExpression.textContent = displayResult.textContent;
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
  if (e.target.id === 'buttonClear') {
    resetCalculator();
  }
  if (e.target.classList.contains('btn--operator')) {
    operator = e.target.value;
    const buttonDecimal = document.querySelector('#buttonDecimal');
    buttonDecimal.disabled = false;
  }
  if (e.target.classList.contains('btn--number')) {
    calculateCurrentExpression();
  }
});

// Get the first and second number then pass onto operate function
const buttonResult = grid.querySelector('#buttonResult');
buttonResult.addEventListener('click', () => {
  displayExpression.textContent = displayResult.textContent;
  currentTerm = parseInt(displayResult, 10);
});

const buttonDecimal = grid.querySelector('#buttonDecimal');
buttonDecimal.addEventListener('click', (e) => {
  e.target.disabled = true;
});

const buttonBackspace = grid.querySelector('#buttonBackspace');
buttonBackspace.addEventListener('click', () => {
  deleteValue();
});

document.addEventListener('keydown', (e) => {
  if (e.key.match(/[0-9.]/g)) {
    displayValue(e.key);
    calculateCurrentExpression();
  }

  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    switch (e.key) {
      case '+': {
        operator = 'add';
        break;
      }

      case '-': {
        operator = 'subtract';
        break;
      }

      case '*': {
        operator = 'multiply';
        break;
      }

      case '/': {
        operator = 'divide';
        break;
      }
      default: {
        break;
      }
    }
    displayOperator(e.key);
  } else if (e.key === 'Backspace') deleteValue();
});

// const buttonNumbers = document.querySelectorAll('.btn--number');

// function createTerm(length){
// for(let i = 0; i < length; i++){
// buttonNumbers[Math.floor(Math.random() * 10)].click();
// }
// }

// createTerm(4);
