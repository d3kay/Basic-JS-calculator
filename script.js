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
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
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
        if (isNaN(previous) || isNaN(current)) return //NaN = not a number
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
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integarDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integarDisplay
        if (isNaN(integarDigits)) {
            integarDisplay = ""
        } else {
            integarDisplay = integarDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integarDisplay}.${decimalDigits}`
        } else {
            return integarDisplay
        }

    }

    updateDisplay () {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
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
    calculator.allClear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})