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
}
function updateDisplay(e) {
  const display = document.querySelector('.display');
  const displayValue = display.querySelector('#displayValue');
  if (e.target.classList.contains('btn--number')) {
    if (displayValue.textContent === '0') displayValue.textContent = e.target.value;
    else displayValue.textContent += e.target.value;
  } else if (e.target.classList.contains('btn--operator')) {
    displayValue.textContent += e.target.textContent;
  }
}
const grid = document.querySelector('.grid');
grid.addEventListener('click', updateDisplay);

const result = grid.querySelector('#buttonResult');
result.addEventListener('click', () => {});
