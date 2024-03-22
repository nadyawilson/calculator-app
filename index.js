let runningLetal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "AC":
            buffer = "0";
            runningLetal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            handleMath(symbol);  // Call handleMath here to perform the calculation
            previousOperator = null;
            buffer = runningLetal.toString();
            runningLetal = 0;
            break;
        case "+":
        case "x":
        case "-":
        case "÷":
            handleMath(symbol);
            break;
        case "<":
            if (buffer.length > 1) {
                buffer = buffer.slice(0, -1); 
            } else {
                buffer = "0";
            }
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseFloat(buffer);
    if (runningLetal === 0) {
        runningLetal = intBuffer;
    } else {
        flashOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flashOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningLetal += intBuffer;
            break;
        case "-":
            runningLetal -= intBuffer;
            break;
        case "x":
            runningLetal *= intBuffer;
            break;
        case "÷":
            runningLetal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function inst() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

inst();