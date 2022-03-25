import Drawing from "./drawing.js";

let historyPosition = 0;
let oldHistory = [];
let operationHistory = [];

// TODO: Merge the two arrays into one. Don't need to store the same image states twice.

const applyHistory = (array) => { // Looks through the 2D array (If no changes were made, no entries were recorded)
    array[historyPosition].forEach((yArray, x) => {
        yArray.forEach((colour, y) => {
            Drawing.setPixel(x, y, colour);
        })
    });
}

const undo = () => {
    if(historyPosition > 0) {
        historyPosition--;
        applyHistory(oldHistory);
    }
    
}
const redo = () => {
    if(historyPosition < operationHistory.length) {
        applyHistory(operationHistory);
        historyPosition++;
    } 
}

const addHistory = (old, operation) => {
    oldHistory.length = historyPosition; // Removes everything after the current position in the array
    oldHistory.push(old); // Adds the entry to the history

    operationHistory.length = historyPosition;
    operationHistory.push(operation);

    historyPosition = oldHistory.length; // Moves the history position towards the end (should be same as "historyPosition++");
}

const setupNewHistory = () => {
    oldHistory.length = 0;
    operationHistory.length = 0;
    historyPosition = 0;
}

export default { addHistory, undo, redo, setupNewHistory };