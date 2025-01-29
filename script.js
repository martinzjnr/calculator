// Get the display input element
const display = document.getElementById('display');

// Get all the button elements
const buttons = document.querySelectorAll('.buttons button');

// Define the calculator functions
const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    operation: null,

    // Update the display value
    updateDisplay() {
        display.value = this.displayValue;
    },

    // Clear the display value
    clear() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.secondOperand = null;
        this.operation = null;
        this.updateDisplay();
    },

    // Delete the last character
    backspace() {
        if (this.displayValue.length > 1) {
            this.displayValue = this.displayValue.slice(0, -1);
        } else {
            this.displayValue = '0';
        }
        this.updateDisplay();
    },

    // Handle number button clicks
    handleNumberButtonClick(number) {
        if (this.displayValue === '0') {
            this.displayValue = number;
        } else {
            this.displayValue += number;
        }
        this.updateDisplay();
    },

    // Handle operation button clicks
    handleOperationButtonClick(operation) {
        if (this.firstOperand === null) {
            this.firstOperand = parseFloat(this.displayValue);
        }
        this.operation = operation;
        this.displayValue = '0';
        this.updateDisplay();
    },

    // Handle equals button click
    handleEqualsButtonClick() {
        if (this.firstOperand !== null) {
            this.secondOperand = parseFloat(this.displayValue);
            let result;
            switch (this.operation) {
                case '+':
                    result = this.firstOperand + this.secondOperand;
                    break;
                case '-':
                    result = this.firstOperand - this.secondOperand;
                    break;
                case '*':
                    result = this.firstOperand * this.secondOperand;
                    break;
                case '/':
                    result = this.firstOperand / this.secondOperand;
                    break;
                default:
                    result = 0;
            }
            this.displayValue = result.toString();
            this.firstOperand = null;
            this.secondOperand = null;
            this.operation = null;
            this.updateDisplay();
        }
    },
};

// Add event listeners to the buttons
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonValue = e.target.textContent;
        switch (buttonValue) {
            case 'AC':
                calculator.clear();
                break;
            case '<':
                calculator.backspace();
                break;
            case '=':
                calculator.handleEqualsButtonClick();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                calculator.handleOperationButtonClick(buttonValue);
                break;
            default:
                calculator.handleNumberButtonClick(buttonValue);
        }
    });
});