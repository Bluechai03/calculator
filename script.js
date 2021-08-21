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
      if (parseInt(firstNum, 10) === 0 || parseInt(secondNum, 10) === 0) {
        alert('NOPE');
        resetCalculator();
        break;
      }
      return console.log('errorrrr');
  }
  return result.toFixed(2).replace(/[.,]00$/, '');
}
const display = document.querySelector('.display');
const displayExpression = display.querySelector('#displayExpression');
const displayResult = display.querySelector('#displayResult');

// Use regex to match everything thats not a number and split into an array
function getValues(array, index) {
  return parseFloat(array[index], 10);
}

function checkOperator() {
  const ifOperatorExists = displayExpression.textContent.match(/[^0-9.]/g);
  return !!ifOperatorExists;
}

function updateDisplay(e) {
  if (e.target.classList.contains('btn--number') || e.target.id === 'buttonDecimal') {
    if (displayExpression.textContent === '0') displayExpression.textContent = e.target.value;
    else displayExpression.textContent += e.target.value;
  } else if (e.target.classList.contains('btn--operator')) {
    if (displayResult.textContent !== '0') {
      displayExpression.textContent = displayResult.textContent;
    }
    displayExpression.textContent += `${e.target.textContent}`;
  }
  if (e.target.id === 'buttonClear') {
    resetCalculator();
  }
}

function resetCalculator() {
  displayExpression.textContent = 0;
  displayResult.textContent = 0;
  buttonDecimal.disabled = false;
  previousTerm = 0;
  operator = '';
  currentTerm = 0;
}

let previousTerm;
let currentTerm;
let operator;

function calculateCurrentExpression() {
  const expression = displayExpression.textContent.replace('', '').split(/[^0-9.]/g);
  previousTerm = getValues(expression, expression.length - 2);
  currentTerm = getValues(expression, expression.length - 1);
  if (previousTerm || currentTerm) displayResult.textContent = operate(previousTerm, operator, currentTerm);
}

const grid = document.querySelector('.grid');
grid.addEventListener('click', (e) => {
  updateDisplay(e);
  if (e.target.classList.contains('btn--operator')) {
    operator = e.target.value;
  }
  if (e.target.classList.contains('btn--number')) {
    if (checkOperator()) {
      calculateCurrentExpression(e);
    }
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
  if (displayExpression.textContent.length > 1) displayExpression.textContent = displayExpression.textContent.slice(0, -1);
  else displayExpression.textContent = 0;
});
// const buttonNumbers = document.querySelectorAll('.btn--number');

// function createTerm(length){
// for(let i = 0; i < length; i++){
// buttonNumbers[Math.floor(Math.random() * 10)].click();
// }
// }

// createTerm(4);
