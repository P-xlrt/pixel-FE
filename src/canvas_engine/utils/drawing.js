import Colour from "./colour.js";
import Pencil from "../tools/pencil.js"
import Flood_Fill from "../tools/flood_fill.js"
import { setupNewHistory , addHistory } from "./history.js";
import { applyResize } from "./view.js";


const canvas_drawing = document.getElementById("canvas_interaction");
const drawingCtx = canvas_drawing.getContext("2d");
const canvas_preview = document.getElementById("canvas_preview");
const previewCtx = canvas_preview.getContext("2d");
const canvas_grid = document.getElementById("canvas_grid");
const gridCtx = canvas_grid.getContext("2d");


// Image drawing variables
let imageSizeX = 16;
let imageSizeY = 16;

export const getImageSize = () => {
    return [imageSizeX, imageSizeY];
}

// Tool variables
let primaryColour = new Colour(255, 0, 0, 0.5);
let secondaryColour = new Colour(0, 255, 0, 1);
let overwriteColours = false;
export const getToolColour = (mouseButton) => {
    return mouseButton == 0 ? primaryColour : secondaryColour;
}

// =========================================================== //
//      IMAGE
// =========================================================== //

const isInBounds = (x, y) => {
    return x >= 0 && x < imageSizeX && y >= 0 && y < imageSizeY;
}

export const getPixel = (x, y) => {
    if(!isInBounds(x, y)) return null;
    const pixel = drawingCtx.getImageData(x, y, 1, 1).data;
    return new Colour(pixel[0], pixel[1], pixel[2], pixel[3] / 255);
}

// Changes the colour of a pixel by overlaying the colour
export const setPixel = (x, y, colour, overwrite = false, usingPreviewCtx = false) => {
    if(!isInBounds(x, y)) return;

    const canvas = usingPreviewCtx ? previewCtx : drawingCtx;
    canvas.globalAlpha = colour.a;
    canvas.fillStyle = colour.rgb;
    if(overwrite) canvas.clearRect(x, y, 1, 1); // Clears the pixel for completely overwriting pixel
    canvas.fillRect(x, y, 1, 1);
}

// Read the pixel array and apply every change.
export const applyChanges = (pixelArray) => {
    
    let historyEntry = [];
    let operationEntry = [];

    for(let x = 0; x < imageSizeX; x++){
        for(let y = 0; y < imageSizeY; y++){
            if(pixelArray[x][y]){
                // Creates a record in the history array
                if(!historyEntry[x]) historyEntry[x] = [];
                historyEntry[x][y] = getPixel(x, y);

                // Creates a record in the operation array
                if(!operationEntry[x]) operationEntry[x] = [];
                operationEntry[x][y] = pixelArray[x][y];

                // Changes the pixel on the canvas
                setPixel(x, y, pixelArray[x][y]);
            } 
        }
    }

    if(historyEntry.length > 0) {
        addHistory(historyEntry, operationEntry);
    }

    // Clear the preview ctx
    previewCtx.clearRect(0, 0, imageSizeX, imageSizeY);
}


// Called when a new canvas is being created or when the window is being resized.
export const newImage = (xSize = 16, ySize = 16) => {
    imageSizeX = xSize;
    imageSizeY = ySize;

    canvas_drawing.width = imageSizeX;
    canvas_drawing.height = imageSizeY;

    canvas_preview.width = imageSizeX;
    canvas_preview.height = imageSizeY;

    // DRAW BLANK IMAGE
    drawingCtx.fillStyle = new Colour(255, 255, 255, 1).rgb; //Colour.generateRGB(255, 255, 255);
    drawingCtx.globalAlpha = 1;
    drawingCtx.fillRect(0, 0, canvas_drawing.width, canvas_drawing.height);

    setupNewHistory();
    applyResize();
}
