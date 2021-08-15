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
