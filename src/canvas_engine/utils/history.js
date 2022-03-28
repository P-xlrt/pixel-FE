import { setPixel } from "./drawing.js";

let historyPosition = 0;
let oldHistory = [];
let operationHistory = [];

// TODO: Merge the two arrays into one. Don't need to store the same image states twice.

const applyHistory = (array) => { // Looks through the 2D array (If no changes were made, no entries were recorded)
    array[historyPosition].forEach((yArray, x) => {
        yArray.forEach((colour, y) => {
            setPixel(x, y, colour, true);
        })
    });
}

export const undo = () => {
    if(historyPosition > 0) {
        historyPosition--;
        applyHistory(oldHistory);
    }
}

export const redo = () => {
    if(historyPosition < operationHistory.length) {
        applyHistory(operationHistory);
        historyPosition++;
    } 
}

export const addHistory = (old, operation) => {
    oldHistory.length = historyPosition; // Removes everything after the current position in the array
    oldHistory.push(old); // Adds the entry to the history

    operationHistory.length = historyPosition;
    operationHistory.push(operation);

    historyPosition = oldHistory.length; // Moves the history position towards the end (should be same as "historyPosition++");
}

export const setupNewHistory = () => {
    oldHistory.length = 0;
    operationHistory.length = 0;
    historyPosition = 0;
}