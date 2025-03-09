"use strict";

let calculation = localStorage.getItem("calculation") || "";

function updateCalculation(character) {
  calculation += character;
  document.querySelector(".js-calculator-monitor").value = calculation;
  storageOperations();
}

function handleKeyPress(event) {
  const key = event.key;

  // Map keys to calculator buttons
  const keyMap = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    Enter: "=",
    Backspace: "<",
    Escape: "C"
  };

  if (keyMap[key]) {
    if (keyMap[key] === "=") {
      calculationResult();
    } else if (keyMap[key] === "<") {
      clearLastCharacter();
    } else if (keyMap[key] === "C") {
      clearAll();
    } else {
      updateCalculation(keyMap[key]);
    }
  }
}

function calculationResult() {
  try {
    console.log("Calculation string:", calculation); // Debugging: Check the input

    // Check if the calculation string is empty or ends with an operator
    if (calculation === "" || /[\+\-\*\/\.]$/.test(calculation)) {
      throw new Error("Invalid expression");
    }

    // Use math.js to safely evaluate the expression
    let result = math.evaluate(calculation);
    document.querySelector(".js-calculator-monitor").value = result;
    calculation = result.toString(); // Convert result back to string for further calculations
    storageOperations();
  } catch (error) {
    console.error("Error:", error.message); // Debugging: Log the error
    document.querySelector(".js-calculator-monitor").value = "Error";
    calculation = "";
    storageOperations();
  }
}

function clearAll() {
  calculation = "";
  document.querySelector(".js-calculator-monitor").value = calculation;
  storageOperations();
}

function clearLastCharacter() {
  calculation = calculation.slice(0, -1); // Remove the last character from the string
  document.querySelector(".js-calculator-monitor").value = calculation;
  storageOperations();
}

function storageOperations() {
  localStorage.setItem("calculation", calculation);
}
