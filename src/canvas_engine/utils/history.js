import { applyImageData } from "./drawing.js";

let history = [];
let historyPosition = 0;

const applyHistory = () => {
    applyImageData(history[historyPosition]);
}

export const undo = () => {
    console.log("Old", historyPosition, history.length)
    if(historyPosition > 0) {
        historyPosition--;
        applyHistory();
    }
    console.log("New", historyPosition, history.length)
}

export const redo = () => {
    console.log("Old", historyPosition, history.length)
    if(historyPosition < history.length - 1) {
        historyPosition++;
        applyHistory();  
    }
    console.log("New", historyPosition, history.length)
}

export const addHistory = (newCanvasData) => {
    console.log("Old", historyPosition, history.length)
    history.length = historyPosition + 1;
    history.push(newCanvasData);
    historyPosition++;
    console.log("New", historyPosition, history.length)
}

export const editCurrentHistory = (newCanvasData) => {
    history[historyPosition] = newCanvasData;
}

export const setupNewHistory = (imageData) => {
    history.length = 0;
    history.push(imageData);
    historyPosition = 0;
}

export const restoreHistory = ([backup, pos]) => {
    history = backup;
    historyPosition = pos;
}

export const backupHistory = () => {
    console.log(history);
    return [[...history], historyPosition];
}