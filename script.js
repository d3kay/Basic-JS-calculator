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
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation) {
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case "*":
                computation = previous * current
                break
            case "÷":
                computation = previous / current
                break   
            default:
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }
    updateDisplay () {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

//putting html dom elements on js variables

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

equalButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})