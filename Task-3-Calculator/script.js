document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const clearBtn = document.getElementById('clearBtn');
    const equalsBtn = document.getElementById('equalsBtn');
    
    const numberButtons = document.querySelectorAll('.btn-number');
    const operatorButtons = document.querySelectorAll('.btn-operator');
    const decimalBtn = document.querySelector('.btn-decimal');

    let currentValue = '0';
    let previousValue = '';
    let activeOperator = '';
    let shouldResetScreen = false;

    const updateDisplay = (value) => {
        display.value = value;
    };

    const resetCalculator = () => {
        currentValue = '0';
        previousValue = '';
        activeOperator = '';
        shouldResetScreen = false;
        updateDisplay('0');
    };

    const calculate = (firstNum, secondNum, operator) => {
        const num1 = parseFloat(firstNum);
        const num2 = parseFloat(secondNum);
        let result = 0;

        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        } else if (operator === '*') {
            result = num1 * num2;
        } else if (operator === '/') {
            if (num2 === 0) {
                return 'Error';
            }
            result = num1 / num2;
        }

        if (result % 1 !== 0) {
            return parseFloat(result.toFixed(8)).toString();
        }

        return result.toString();
    };

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.getAttribute('data-value');

            if (shouldResetScreen || currentValue === 'Error') {
                currentValue = digit;
                shouldResetScreen = false;
            } else {
                if (currentValue === '0') {
                    currentValue = digit;
                } else {
                    currentValue = currentValue + digit;
                }
            }
            updateDisplay(currentValue);
        });
    });

    if (decimalBtn) {
        decimalBtn.addEventListener('click', () => {
            if (shouldResetScreen || currentValue === 'Error') {
                currentValue = '0.';
                shouldResetScreen = false;
            } else {
                if (!currentValue.includes('.')) {
                    currentValue = currentValue + '.';
                }
            }
            updateDisplay(currentValue);
        });
    }

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const operator = button.getAttribute('data-value');

            if (currentValue === 'Error') return;

            if (activeOperator !== '' && !shouldResetScreen) {
                const intermediateResult = calculate(previousValue, currentValue, activeOperator);
                currentValue = intermediateResult;
                updateDisplay(currentValue);
            }

            previousValue = currentValue;
            activeOperator = operator;
            shouldResetScreen = true;
        });
    });

    if (equalsBtn) {
        equalsBtn.addEventListener('click', () => {
            if (previousValue !== '' && activeOperator !== '') {
                const finalResult = calculate(previousValue, currentValue, activeOperator);
                currentValue = finalResult;
                updateDisplay(currentValue);
                previousValue = '';
                activeOperator = '';
                shouldResetScreen = true;
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', resetCalculator);
    }
});
