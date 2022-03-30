import Colour from "./colour.js";
import { setupNewHistory , addHistory, editCurrentHistory } from "./history.js";
import { applyResize } from "./view.js";


// Stores references to the HTML elements
let canvas_container, canvas_drawing, drawingCtx, canvas_preview, previewCtx, canvas_grid, gridCtx;
let primaryColourBox, secondaryColourBox, primaryCtx, secondaryCtx, hexInput, modifyingText, rSlider, gSlider, bSlider, aSlider, rNum, gNum, bNum, aNum;

// Image drawing variables
let imageSizeX = 16;
let imageSizeY = 16;

// Tool variables
const emptyColour = new Colour(0, 0, 0, 0);
let primaryColour = new Colour(0, 0, 0, 1);
let secondaryColour = new Colour(255, 255, 255, 1);
let overwriteColours = false;
export const setOverwriteColours = bool => overwriteColours = bool;

export const getOverwriteColours = () => { 
    return overwriteColours; 
}

export const getToolColour = (mouseButton) => {
    return mouseButton == 0 ? primaryColour : secondaryColour;
}

// Set up event handlers and make initial changes when the page is ready
export const setupDrawing = () => {
    canvas_container = document.getElementById("canvas_container");
    canvas_drawing = document.getElementById("canvas_interaction");
    drawingCtx = canvas_drawing.getContext("2d");
    canvas_preview = document.getElementById("canvas_preview");
    previewCtx = canvas_preview.getContext("2d");
    canvas_grid = document.getElementById("canvas_grid");
    gridCtx = canvas_grid.getContext("2d");
    primaryColourBox = document.getElementById("primaryColourBox");
    primaryCtx = primaryColourBox.getContext("2d");
    secondaryColourBox = document.getElementById("secondaryColourBox");
    secondaryCtx = secondaryColourBox.getContext("2d");
    hexInput = document.getElementById("hex_input");
    modifyingText = document.getElementById("selectPrimarySecondary_text");
    rSlider = document.getElementById("slider_red");
    gSlider = document.getElementById("slider_green");
    bSlider = document.getElementById("slider_blue");
    aSlider = document.getElementById("slider_alpha");
    rNum = document.getElementById("number_red");
    gNum = document.getElementById("number_green");
    bNum = document.getElementById("number_blue");
    aNum = document.getElementById("number_alpha");
    refreshPrimary();
    refreshSecondary();

    // Automatically colours the slider backgrounds
    const red = document.getElementById("background_red").getContext("2d");
    const green = document.getElementById("background_green").getContext("2d");
    const blue = document.getElementById("background_blue").getContext("2d");
    const alpha = document.getElementById("background_alpha").getContext("2d");
    for(let x = 0; x < 256; x++){
        red.fillStyle = Colour.generateRGB(x, 0, 0);
        red.fillRect(x, 0, 1, 1);
        green.fillStyle = Colour.generateRGB(0, x, 0);
        green.fillRect(x, 0, 1, 1);
        blue.fillStyle = Colour.generateRGB(0, 0, x);
        blue.fillRect(x, 0, 1, 1);
        alpha.fillStyle = Colour.generateRGB(0, 0, 0);
        alpha.globalAlpha = x / 256;
        alpha.fillRect(x, 0, 1, 1);
    }

    updateModifyingColour(true);
}

export const swapColours = (e) => {
    e.preventDefault();
    const temp = primaryColour;
    primaryColour = secondaryColour;
    secondaryColour = temp;
    refreshPrimary();
    refreshSecondary();
    updateModifyingColour(modifyingPrimary);
}

// 0 = Red, 1 = Blue, 2 = Green, 3 = Alpha
export const changeSlider = (slider, value) => {
    const current = modifyingPrimary ? primaryColour : secondaryColour;

    let newColour = new Colour(
        slider == 0 ? value : current.r,
        slider == 1 ? value : current.g,
        slider == 2 ? value : current.b,
        slider == 3 ? value / 255 : current.a
    )

    if(modifyingPrimary){
        primaryColour = newColour;
        refreshPrimary();
    } 
    else {
        secondaryColour = newColour;
        refreshSecondary();
    }
    updateSliders();
}

const changeColour = (newColour) => {
    if(newColour === null) return; // Do nothing if the colour is invalid
    if(modifyingPrimary){
        primaryColour = newColour;
        refreshPrimary();
    } 
    else {
        secondaryColour = newColour;
        refreshSecondary();
    }
    updateSliders();
}

export const changeHex = (hex) => {
    if(hex[0] == "#") hex = hex.substring(1); // Remove the optional "#" that hex values sometimes start with
    if(hex.length != 6) return; // Hexadecimal values must be 6 characters long
    const alpha = modifyingPrimary ? primaryColour.a : secondaryColour.a; // Get the alpha of the colour thats being modified
    changeColour(Colour.generateFromHex(hex, alpha));
}

export const getImageSize = () => {
    return [imageSizeX, imageSizeY];
}

let modifyingPrimary = true; // True for primary, false for secondary
export const updateModifyingColour = (newModifying) => {
    modifyingPrimary = newModifying;
    modifyingText.innerHTML = "Modifying " + (modifyingPrimary ? "Primary" : "Secondary");
    if(modifyingPrimary){
        primaryColourBox.style.zIndex = 1;
        secondaryColourBox.style.zIndex = 0;
    }
    else{
        primaryColourBox.style.zIndex = 0;
        secondaryColourBox.style.zIndex = 1;
    }
    updateSliders();
}

const updateSliders = () => {
    rSlider.value = modifyingPrimary ? primaryColour.r : secondaryColour.r;
    gSlider.value = modifyingPrimary ? primaryColour.g : secondaryColour.g;
    bSlider.value = modifyingPrimary ? primaryColour.b : secondaryColour.b;
    aSlider.value = modifyingPrimary ? primaryColour.a * 255 : secondaryColour.a * 255;
    rNum.value = rSlider.value;
    gNum.value = gSlider.value;
    bNum.value = bSlider.value;
    aNum.value = aSlider.value;
    hexInput.value = modifyingPrimary ? primaryColour.hex : secondaryColour.hex;
}

const refreshPrimary = () => {
    primaryCtx.fillStyle = primaryColour.rgb;
    primaryCtx.globalAlpha = primaryColour.a;
    primaryCtx.clearRect(0, 0, 1, 1);
    primaryCtx.fillRect(0, 0, 1, 1);
}
const refreshSecondary = () => {
    secondaryCtx.fillStyle = secondaryColour.rgb;
    secondaryCtx.globalAlpha = secondaryColour.a;
    secondaryCtx.clearRect(0, 0, 1, 1);
    secondaryCtx.fillRect(0, 0, 1, 1);
}

export const setToolColour = (mouseButton, colour) => {
    if(mouseButton == 0) {
        primaryColour = colour;
        refreshPrimary();
    }
    else if(mouseButton == 2) {
        secondaryColour = colour;
        refreshSecondary();
    }
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
    return new Colour(pixel[0], pixel[1], pixel[2], pixel[3] / 256);
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

export const clearPreviewCanvas = () => {
    previewCtx.clearRect(0, 0, imageSizeX, imageSizeY);
}

const setupPixelData = () => {
    return drawingCtx.getImageData(0, 0, imageSizeX, imageSizeY).data;
}

export const applyImageData = (data) => {
    drawingCtx.putImageData(data, 0, 0);
}

const applyPixelData = (pixelArray) => {
    const pixelData = setupPixelData();
    let yPosition = 0, position = 0;;

    for(let y = 0; y < imageSizeY; y++){
        yPosition = y * imageSizeX;
        for(let x = 0; x < imageSizeX; x++){
            position = (yPosition + x) * 4;
            if(pixelArray[x][y]){
                pixelData[position] = pixelArray[x][y].r;
                pixelData[position + 1] = pixelArray[x][y].g;
                pixelData[position + 2] = pixelArray[x][y].b;
                pixelData[position + 3] = pixelArray[x][y].a * 255;
            }
        }
    }

    return new ImageData(Uint8ClampedArray.from(pixelData), imageSizeX);
}

// Read the pixel array and apply every change.
export const applyChanges = (pixelArray, clearPreview = true) => {
    const data = applyPixelData(pixelArray);
    drawingCtx.putImageData(data, 0, 0);
    addHistory(data);

    // Clear the preview ctx
    if(clearPreview) {
        clearPreviewCanvas();
    }
}

export const applyChangesMove = (data, xPos, yPos) => {
    drawingCtx.putImageData(data, xPos, yPos);
    editCurrentHistory(drawingCtx.getImageData(0, 0, imageSizeX, imageSizeY));
    clearPreviewCanvas();
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

    setupNewHistory(drawingCtx.getImageData(0, 0, imageSizeX, imageSizeY));
    applyResize();
}

const validateSelection = (x1, x2, y1, y2) => {
    return x1 !== null || x2 !== null || y1 !== null || y2 !== null
}

export const deleteCanvasArea = (selX, selY, sizeX, sizeY, previewCanvas = true) => {
    if(previewCanvas) previewCtx.clearRect(selX, selY, sizeX, sizeY);
    else drawingCtx.clearRect(selX, selY, sizeX, sizeY);
}

export const setCanvasArea = (selX, selY, sizeX, sizeY, colour, previewCanvas = true) => {
    const ctx = previewCanvas ? previewCtx : drawingCtx;
    ctx.fillStyle = colour.rgb;
    ctx.globalAlpha = colour.a;
    ctx.fillRect(selX, selY, sizeX, sizeY);
}

// Deletes everything that has been selected
export const deleteSelection = (selX1, selY1, selX2, selY2) => {
    if(!validateSelection(selX1, selX2, selY1, selY2)) return;
    const xSize = selX2 - selX1 + 1;
    const ySize = selY2 - selY1 + 1;

    // Add pixel data to history
    addHistory(drawingCtx.getImageData(0, 0, imageSizeX, imageSizeY));
    // Delete!
    deleteCanvasArea(selX1, selY1, xSize, ySize, true);
    deleteCanvasArea(selX1, selY1, xSize, ySize, false);
}

export const getDataURL = () => {
    return canvas_drawing.toDataURL();
}