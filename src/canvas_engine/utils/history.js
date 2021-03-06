import { applyImageData, deleteCanvas } from "./drawing.js";

let history = [];
let historyPosition = 0;

const applyHistory = () => {
    deleteCanvas();
    applyImageData(history[historyPosition]);
}

export const undo = () => {
    if(historyPosition > 0) {
        historyPosition--;
        applyHistory();
    }
}

export const redo = () => {
    if(historyPosition < history.length - 1) {
        historyPosition++;
        applyHistory();  
    }
}

export const addHistory = (newCanvasData) => {
    history.length = historyPosition + 1;
    history.push(newCanvasData);
    historyPosition++;
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
    return [[...history], historyPosition];
}