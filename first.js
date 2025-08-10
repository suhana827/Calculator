const heading = document.createElement("h1");
heading.textContent = "Calculator";
heading.style.fontSize = "4rem";
heading.style.color = "black";
heading.style.textAlign = "center";
heading.style.marginTop = "20px";
document.body.appendChild(heading);


const calculator = document.createElement("div");
calculator.id = "calculator";
document.body.appendChild(calculator);

calculator.style.position = "absolute";
calculator.style.top = "50%";
calculator.style.left = "50%";
calculator.style.transform = "translate(-50%, -50%)";
calculator.style.background = "#9CAFAA";
calculator.style.padding = "20px";
calculator.style.borderRadius = "10px";
calculator.style.width = "400px";
calculator.style.marginTop = "4rem";
calculator.style.height = "580px";


const display = document.createElement("div");
display.id = "display";
calculator.appendChild(display);

display.style.background = "#222";
display.style.color = "white"; 
display.style.fontSize = "2em";
display.style.padding = "10px";
display.style.borderRadius = "5px";
display.style.textAlign = "right";
display.style.marginBottom = "25px";
display.style.marginTop = "17px"
display.style.minHeight = "75px";


const buttonContainer = document.createElement("div");
buttonContainer.id = "buttons";
calculator.appendChild(buttonContainer);

buttonContainer.style.display = "grid";
buttonContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
buttonContainer.style.gap = "10px";


const historyBox = document.createElement("div");
historyBox.id = "history";
calculator.appendChild(historyBox);

historyBox.style.marginTop = "30px";
historyBox.style.fontSize = "0.85em";
historyBox.style.background = "#f9f9f9";
historyBox.style.padding = "5px";
historyBox.style.borderRadius = "5px";
historyBox.style.maxHeight = "60px";
historyBox.style.overflowY = "auto";



const buttonLabels = [
    '7','8','9','/',
    '4','5','6','*',
    '1','2','3','-',
    '0','.','⌫','+',
    'C','AC','='
];

// Create buttons
buttonLabels.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;

    if (["+", "-", "*", "/"].includes(label)) btn.classList.add("operator");
    if (label === "=") btn.classList.add("equal");
    if (label === "C") btn.classList.add("clear-display");
    if (label === "AC") btn.classList.add("clear-all");
    if (label === ".") btn.classList.add("dot");

    buttonContainer.appendChild(btn);
});

// Body style
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.background = "#D6DAC8";
document.body.style.margin = "0";

// Select all buttons
const buttons = document.querySelectorAll("#buttons button");
buttons.forEach(btn => {
    btn.style.padding = "15px";
    btn.style.fontSize = "1.2em";
    btn.style.border = "none";
    btn.style.borderRadius = "30rem";
    btn.style.transition = "background 0.2s, transform 0.1s";

    if (btn.classList.contains("operator")) {
        btn.style.background = "#ff9800";
        btn.style.color = "white";
        btn.style.fontSize = "2rem";
    } else if (btn.classList.contains("equal")) {
        btn.style.background = "orange";
        btn.style.fontSize = "2rem";
        btn.style.color = "white";
        btn.style.gridColumn = "span 1.7";
    } else if (btn.classList.contains("clear-display")) {
        btn.style.background = "white";
        btn.style.color = "black";
    } else if (btn.classList.contains("clear-all")) {
        btn.style.background = "white";
        btn.style.color = "black";
    } else {
        btn.style.background = "white";
    }

    btn.addEventListener("mouseover", () => {
        btn.style.opacity = "0.9";   // Slightly dim
        btn.style.transform = "scale(1.05)"; // Slight lift
    });
    
    btn.addEventListener("mouseout", () => {
        btn.style.opacity = "1";
        btn.style.transform = "scale(1)";
    });

})



// functionality

let currentInput = "";
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function updateDisplay() {
    display.textContent = currentInput || "0";
}

function updateHistory() {
    historyBox.innerHTML = history.map(h => `<div>${h}</div>`).join("");
}

function calculate() {
    try {
        const result = eval(currentInput);
        history.push(currentInput + " = " + result);
        localStorage.setItem("calcHistory", JSON.stringify(history));
        currentInput = result.toString();
        updateHistory();
    } catch {
        currentInput = "Error";
    }
}

function handleButtonClick(value) {
    if (value === "C") {
        currentInput = "";
    } else if (value === "AC") {
        currentInput = "";
        history = [];
        localStorage.removeItem("calcHistory");
        updateHistory();
    } else if (value === "=") {
        calculate();
    } else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput += value
    }
    updateDisplay();
}

// Click Events
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleButtonClick(button.textContent);
    });
});

// Keyboard Events
document.addEventListener("keydown", e => {
    if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
        currentInput += e.key;
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
    } else if (e.key.toLowerCase() === "c") {
        currentInput = "";
    } else if (e.key.toLowerCase() === "a") {
        currentInput = "";
        history = [];
        localStorage.removeItem("calcHistory");
        updateHistory();
    }
    updateDisplay();
});

// Init
updateDisplay();
updateHistory();


