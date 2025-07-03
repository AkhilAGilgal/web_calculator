document.addEventListener('DOMContentLoaded', () => {
    const outputDisplay = document.getElementById('output');
    const buttonsContainer = document.querySelector('.buttons');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    function updateDisplay() {
        outputDisplay.textContent = currentInput;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = "Error"; 
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }

    buttonsContainer.addEventListener('click', (event) => {
        if (!event.target.matches('button')) return;

        const button = event.target;
        const value = button.dataset.value;

        if (!isNaN(value) || value === '.') { 
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                return;
            } else {
                currentInput += value;
            }
        } else if (['+', '-', '*', '/'].includes(value)) { 
            if (operator !== null) {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '0';
        } else { 
            switch (value) {
                case 'AC':
                    currentInput = '0';
                    previousInput = '';
                    operator = null;
                    break;
                case '+/-':
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    break;
                case '%':
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    break;
                case '=':
                    if (operator === null || previousInput === '') return;
                    calculate();
                    break;
            }
        }
        
        updateDisplay();
    });

    updateDisplay();
});
