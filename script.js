let currentInput = '';
let firstNumber = null;
let operator = null;
let secondNumber = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
}

function clearDisplay() {
    currentInput = '';
    firstNumber = null;
    operator = null;
    secondNumber = null;
    updateDisplay('0');
}

function setOperator(op) {
    if (currentInput === '') return;
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
        operator = op;
        currentInput = '';
    } else if (operator !== null) {
        calculate();
        operator = op;
    }
}

function toggleNegative() {
    if (currentInput === '') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(currentInput);
}

function calculate() {
    if (currentInput === '' || operator === null || firstNumber === null) return;
    secondNumber = parseFloat(currentInput);
    let result = 0;
    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
    }

    // Add the result to history
    addHistory(firstNumber, operator, secondNumber, result);

    // Display the result
    updateDisplay(result);

    // Reset
    firstNumber = result;
    currentInput = '';
    operator = null;
}

function addHistory(first, op, second, result) {
    const historyBody = document.getElementById('history-body');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${first}</td>
        <td>${op}</td>
        <td>${second}</td>
        <td>${result}</td>
    `;

    historyBody.appendChild(row);
}
