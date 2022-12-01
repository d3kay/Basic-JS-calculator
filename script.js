//calculators opertaion class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }
    allClear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    } 
    delete() {

    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return //so that " . " doesnot get overwritten by user
        this.currentOperand = this.currentOperand.toString() + number.toString() //adds the integar values
    }
    chooseOperation(operation) {
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute() {

    }
    updateDisplay () {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const previousOperandTextElement = document.querySelector (
    "[data-previous-operand]"
)

const currentOperandTextElement = document.querySelector (
    "[data-current-operand]"
)

const numberButtons = document.querySelectorAll(
    "[data-number]"
)
const operationsButtons = document.querySelectorAll(
    "[data-operation]"
)
const equalButton = document.querySelector(
    "[data-equal]"
)
const deleteButton = document.querySelector(
    "[data-delete]"
)
const allClearButton = document.querySelector(
    "[data-all-clear]"
)

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})