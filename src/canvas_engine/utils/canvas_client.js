import { undo, redo, addHistory, setupNewHistory } from "./history";
import { setupView, changeZoom, offsetPosition, redrawGrid, clientToCanvasCoordinate } from "./view";
import { newImage, setupDrawing, deleteSelection, getImageSize } from "./drawing";
import Colour from "./colour";
import Pencil from "../tools/pencil";
import Selection_Tool from "../tools/selection_tool";
import Move_Tool from "../tools/move_tool";
import Flood_Fill from "../tools/flood_fill";
import Line_Tool from "../tools/line_tool";
import Colour_Picker from "../tools/colour_picker";
import Eraser from "../tools/eraser";

let canvas_container, canvas_drawing, drawingCtx, canvas_preview, previewCtx, canvas_grid, gridCtx, animationCtx;

// Tools
let tool = null;
export const setTool = (newTool) => {
    if(tool) tool.tool_unselected();
    tool = newTool;
    tool.tool_selected();

    // Iterate through all tool selection buttons inside of the toolbox and disable their "selected button" css
    const toolButtons = document.getElementById("tools").children;
    for(let i = 0; i < toolButtons.length; i++){
        toolButtons[i].classList.remove("toolbox_selected");
    }

    // Reenables the "selected button" css of the button assosciated with the tool.
    // console.log(tool.constructor.name); // Alternative method
    document.getElementById(tool.buttonID).classList.toggle("toolbox_selected");
}

// Image moving variables
let panning = false;
let cursorLocationX = 0;
let cursorLocationY = 0;

// Key press / unpress detection for the whole window
// One key instruction at a time and only once, until it's unpressed
let keyDebounce = null; 

export const createNewImage = (x = 16, y = 16) => {
    newImage(x, y);
}

// Selection
let selX1 = null, selY1 = null, selX2 = null, selY2 = null;
let selectedURL = null;
export const changeSelection = (x1, y1, x2, y2) => {
    selX1 = Math.max(Math.min(x1, x2), 0);
    selY1 = Math.max(Math.min(y1, y2), 0);
    selX2 = Math.min(Math.max(x1, x2), canvas_drawing.width);
    selY2 = Math.min(Math.max(y1, y2), canvas_drawing.height);
}

const selectAll = () => {
    selX1 = 0; 
    selY1 = 0; 
    selX2 = canvas_drawing.width - 1;
    selY2 = canvas_drawing.height - 1;
}

const validateSelection = () => {
    return selX1 !== null || selX2 !== null || selY1 !== null || selY2 !== null
}

// =========================================================== //
//      FUNCTIONS
// =========================================================== //

export const canvasWheel = (e) => {
    e.preventDefault();
    if(e.ctrlKey){
        changeZoom(e.deltaY, e.clientX, e.clientY); // Zoom
    }
    else{
        offsetPosition(0, e.deltaY / 2); // Scroll
    }
}

export const windowKeyDown = (e) => {
    if(document.activeElement.classList.contains('keypress_input')) return; // If the user hasn't selected an input field to type inside of, do nothing.
    console.log("Canvas client:", e.code);
    e.preventDefault();
    if(!keyDebounce){
        if(e.ctrlKey){
            if(e.code == "KeyZ"){ // Undo
                keyDebounce = e.code;
                commenceUndo();
            }
            else if(e.code == "KeyY"){ // Redo
                keyDebounce = e.code;
                commenceRedo();
            }
            else if(e.code == "KeyC"){ // Copy
                keyDebounce = e.code;
                copy();
            }
            else if(e.code == "KeyV"){ // Paste
                keyDebounce = e.code;
                paste();
            }
            else if(e.code == "KeyA"){ // Select all
                keyDebounce = e.code;
                selectAll();
                const tool = new Selection_Tool(changeSelection, [selX1, selY1, selX2, selY2])
                setTool(tool);
                tool.start();
            }
            else if(e.code == "KeyX"){
                keyDebounce = e.code;
                cut();
            }
        }
        else if(e.code == "Delete"){ // Delete selection
            if(!validateSelection()) return;
            keyDebounce = e.code;
            deleteSelection(selX1, selY1, selX2, selY2);
        }
        else if(e.code == "KeyM"){ // Move
            keyDebounce = e.code;
            startMove();
        }
        else if(e.code == "KeyS"){
            keyDebounce = e.code;
            setTool(new Selection_Tool(changeSelection));
        }
        else if(e.code == "KeyP"){
            keyDebounce = e.code;
            setTool(new Pencil());
        }
        else if(e.code == "KeyF"){
            keyDebounce = e.code;
            setTool(new Flood_Fill());
        }
        else if(e.code == "KeyO"){
            keyDebounce = e.code;
            setTool(new Line_Tool());
        }
        else if(e.code == "KeyK"){
            keyDebounce = e.code;
            setTool(new Colour_Picker());
        }
        else if(e.code == "KeyE"){
            keyDebounce = e.code;
            setTool(new Eraser());
        }
    }
}

export const windowKeyUp = (e) => {
    if(document.activeElement.id == "hex_input") return; // Don't do any keyboard inputs if user is trying to type in the hex input
    
    if(keyDebounce == e.code){
        keyDebounce = false;
    }
}

export const windowMouseMove = (e) => {
    if(panning){
        // Apply offset to old position
        offsetPosition(cursorLocationX - e.clientX, cursorLocationY - e.clientY);

        // Update the "old" position
        cursorLocationX = e.clientX;
        cursorLocationY = e.clientY;    
    }
    else{
        if(!tool) return;
        tool.mouseMove(e.clientX, e.clientY);
    }
}

export const windowMouseUp = (e) => {
    if(e.button == 1){
        panning = false;
        return;
    }

    // End tool usage, don't do anything if tool doesn't exist or if the tool isn't started.
    if(!tool && !tool.started) return;
    tool.end(e.button, e.clientX, e.clientY);
}

export const canvasMouseDown = (e) => {
    if(e.button == 1){
        e.preventDefault();
        cursorLocationX = e.clientX;
        cursorLocationY = e.clientY;
        panning = true;
    }
    else{
        if (!tool) return;
        if (e.target.id !== "canvas_container" && e.target.tagName !== "CANVAS") return;

        // Different rules for moving tool
        if(tool.specialType() == "Moving"){ 
            if(e.button == 0) tool.start(e.button, e.clientX, e.clientY); // Behave as normal if left mouse click is changed.
            else setTool(new Selection_Tool(changeSelection)); // Moving tools finalize their change when right mouse button is pressed.
            return; // Don't run anything else in this function.
        }

        // Every other tool
        if(e.button == 0 || e.button == 2) {
            if(tilingActive){
                tool.start(e.button, e.clientX, e.clientY);
            }
            else{
                tool.start(e.button, e.clientX, e.clientY);
            }
        }
        
    }
}

// The Image class can be used in a canvas' drawImage function, which pastes the image onto the canvas.
// The event handler for loading the image has to be done before the image's source is modified.
// When the image is loaded from the URL, a new canvas is created and the image is put on it.
export const loadImage = (dataURL) => {
    let img = new Image();

    img.addEventListener("load", function () {
        // console.log(img.src);
        createNewImage(img.width, img.height);

        drawingCtx.globalAlpha = 0.999999; // Img doesn't deal with transparency by default
        drawingCtx.drawImage(img, 0, 0);
        setupNewHistory(drawingCtx.getImageData(0, 0, img.width, img.height));

        img.remove();
        // console.log(drawingCtx.getImageData(0, 0, img.width, img.height));
    });

    img.src = dataURL;
}

export const commenceUndo = () => {
    if(tool.specialType() === "Moving") setTool(new Selection_Tool(changeSelection)); // Moving tools finalize their change when right mouse button is pressed.
    undo();
}

export const commenceRedo = () => {
    if(tool.specialType() === "Moving") return;
    redo();
}

export const startMove = () => {
    if(!validateSelection()) selectAll();

    const image = drawingCtx.getImageData(selX1, selY1, selX2 - selX1 + 1, selY2 - selY1 + 1); // Get image data
    deleteSelection(selX1, selY1, selX2, selY2); // Delete selection

    setTool(new Move_Tool(image, selX1, selY1));
    selX1 = null, selY1 = null, selX2 = null, selY2 = null;
}

export const cut = async () => {
    copy();
    deleteSelection(selX1, selY1, selX2, selY2);
}

export const copy = async () => {
    
    // If nothing selected, do nothing. 
    if(!validateSelection()) return; 

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 1 + (selX2 - selX1);
    tempCanvas.height = 1 + (selY2 - selY1);
    const ctx = tempCanvas.getContext("2d");

    // Copy the selected pixels onto the temporary canvas
    let img = new Image();

    img.addEventListener("load", function () {
        ctx.drawImage(img, -selX1, -selY1);
        selectedURL = tempCanvas.toDataURL();
        try {
            tempCanvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
        } 
        catch (err) {
            console.log(err);
            //alert("An error occured. If you are using Firefox, type 'about:config' into the URL bar, search for 'dom.events.asyncClipboard.clipboardItem' and enable it.");
        }
        tempCanvas.remove();
    });

    img.src = canvas_drawing.toDataURL();

}

const startPaste = (dataURL) => {

    let img = new Image();
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");

    img.addEventListener("load", function () {
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;

        ctx.fillStyle = new Colour(255, 255, 255, 0).rgb; //Colour.generateRGB(255, 255, 255);
        ctx.globalAlpha = 0;
        ctx.fillRect(0, 0, canvas_drawing.width, canvas_drawing.height);

        ctx.globalAlpha = 0.999999; // Img doesn't deal with transparency by default
        ctx.drawImage(img, 0, 0);

        setTool(new Move_Tool(ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height), 0, 0));
        
        img.remove();
        tempCanvas.remove();
    });

    img.src = dataURL;
}

export const getImageFromText = async text => {
    try{
        startPaste(text);
    }
    catch{
        console.log("Could not interpret pasted text as an image.");
    }
}

export const paste = async () => {
    try {
        // Tries to read from the clipboard first
        const clipboardItem = (await navigator.clipboard.read())[0];
        if(clipboardItem.types.includes("image/png")){ // Pasting an image
            console.log("Pasting an image");
            const dataURL = await clipboardItem.getType("image/png");
            startPaste(URL.createObjectURL(dataURL));
        }
        else if(clipboardItem.types.includes("text/plain")){
            console.log("Pasting text");
            const dataURL = await clipboardItem.getType("text/plain");
            getImageFromText(await dataURL.text());
        }
        else{
            // Unknown paste data, try using backup copy instead.
            throw new Error();
        }
    }
    catch (err) {
        //alert("An error occured. If you are using Firefox, type 'about:config' into the URL bar, search for 'dom.events.asyncClipboard.read' and enable it.");
        // If we can't read from the clipboard (firefox settings), read from the selectedURL variable
        console.log("Pasting internal url");
        startPaste(selectedURL);
    }
}

// ----------------------------------------------
// 		Toolbox buttons

// When the user clicks this button, it creates a temporary anchor tag that is provided the image data and download attributes.
// It's automatically clicked, which starts the download functionality on the browser. Once it's done, the anchor is deleted.
export const exportImage = () => {
    let a = document.createElement("a");
    a.href = canvas_drawing.toDataURL();
    a.setAttribute("download", document.getElementById("name_input").value + ".png"); // export.png can be changed to image title name
    a.click();
    a.remove();
}


// Toggle grid button
export const toggleGrid = () => {
    canvas_grid.style.visibility = canvas_grid.style.visibility == "hidden" ? "visible" : "hidden";
    redrawGrid();
}

const createDuplicateCanvas = () => {
    let canvas = document.createElement("canvas");
    canvas.classList.add("canvas_tiling");
    canvas.width = canvas_drawing.width;
    canvas.height = canvas_drawing.height;
    canvas.style.width = canvas_drawing.style.width;
    canvas.style.height = canvas_drawing.style.height;
    canvas_container.appendChild(canvas);
    return canvas;
}

const createDuplicatePreview = () => {
    let canvas = createDuplicateCanvas();
    canvas.classList.remove("canvas_tiling");
    canvas.classList.add("canvas_tiling_preview");
    return canvas;
}

let tilingActive = false;
let tilingCanvases = [];
let tilingCanvasCtx = [];
let tilingPreviews = [];
let tilingPreviewCtx = [];
let orientation = "Horizontal";

export const getTiling = () => { return tilingActive; }

export const copyTiles = (imageData) => {
    if(!tilingActive) return;

    for(let i = 0; i < 9; i++){
        if(i == 4) continue;
        const canvas = tilingCanvasCtx[i];
        if(!canvas) continue;
        tilingCanvasCtx[i].clearRect(0, 0, canvas.width, canvas.height);
        tilingCanvasCtx[i].putImageData(imageData, 0, 0);
    }
}

export const setPixelTiles = (x, y, colour, overwrite) => {
    if(!tilingActive) return;
    for(let i = 0; i < 9; i++){
        if(i == 4) continue;
        const canvas = tilingPreviewCtx[i];
        if(!canvas) continue;
        canvas.globalAlpha = colour.a;
        canvas.fillStyle = colour.rgb;
        if(overwrite) canvas.clearRect(x, y, 1, 1); // Clears the pixel for completely overwriting pixel
        canvas.fillRect(x, y, 1, 1);
    }
}

export const clearPreviewTiles = () => {
    if(!tilingActive) return;
    for(let i = 0; i < 9; i++){
        if(i == 4 || !tilingPreviews[i]) continue;
        tilingPreviewCtx[i].clearRect(0, 0, tilingPreviews[i].width, tilingPreviews[i].height);
    }
}
/*
    0   1   2
    3   4   5
    6   7   8
*/
export const repositionTiles = () => {
    if(!tilingActive) return;
    const drawing = canvas_drawing.getBoundingClientRect();
    const offset = canvas_container.getBoundingClientRect();

    const xPos = drawing.left;
    const yPos = drawing.top - offset.top;

    if(tilingCanvases[0]){
        tilingCanvases[0].style.left = (xPos - drawing.width) + "px";
        tilingCanvases[0].style.top = (yPos - drawing.height) + "px";
        tilingPreviews[0].style.left = tilingCanvases[0].style.left;
        tilingPreviews[0].style.top = tilingCanvases[0].style.top;
    }
    if(tilingCanvases[1]){
        tilingCanvases[1].style.left = (xPos) + "px";
        tilingCanvases[1].style.top = (yPos - drawing.height) + "px";
        tilingPreviews[1].style.left = tilingCanvases[1].style.left;
        tilingPreviews[1].style.top = tilingCanvases[1].style.top;
    }
    if(tilingCanvases[2]){
        tilingCanvases[2].style.left = (xPos + drawing.width) + "px";
        tilingCanvases[2].style.top = (yPos - drawing.height) + "px";
        tilingPreviews[2].style.left = tilingCanvases[2].style.left;
        tilingPreviews[2].style.top = tilingCanvases[2].style.top;
    }
    if(tilingCanvases[3]){
        tilingCanvases[3].style.left = (xPos - drawing.width) + "px";
        tilingCanvases[3].style.top = (yPos) + "px";
        tilingPreviews[3].style.left = tilingCanvases[3].style.left;
        tilingPreviews[3].style.top = tilingCanvases[3].style.top;
    }
    if(tilingCanvases[5]){
        tilingCanvases[5].style.left = (xPos + drawing.width) + "px";
        tilingCanvases[5].style.top = (yPos) + "px";
        tilingPreviews[5].style.left = tilingCanvases[5].style.left;
        tilingPreviews[5].style.top = tilingCanvases[5].style.top;
    }
    if(tilingCanvases[6]){
        tilingCanvases[6].style.left = (xPos - drawing.width) + "px";
        tilingCanvases[6].style.top = (yPos + drawing.height) + "px";
        tilingPreviews[6].style.left = tilingCanvases[6].style.left;
        tilingPreviews[6].style.top = tilingCanvases[6].style.top;
    }
    if(tilingCanvases[7]){
        tilingCanvases[7].style.left = (xPos) + "px";
        tilingCanvases[7].style.top = (yPos + drawing.height) + "px";
        tilingPreviews[7].style.left = tilingCanvases[7].style.left;
        tilingPreviews[7].style.top = tilingCanvases[7].style.top;
    }
    if(tilingCanvases[8]){
        tilingCanvases[8].style.left = (xPos + drawing.width) + "px";
        tilingCanvases[8].style.top = (yPos + drawing.height) + "px";
        tilingPreviews[8].style.left = tilingCanvases[8].style.left;
        tilingPreviews[8].style.top = tilingCanvases[8].style.top;
    }
    const [x, y] = getImageSize();
    copyTiles(drawingCtx.getImageData(0, 0, x, y));
}

const deleteTiles = () => {
    for(let i = 0; i < 9; i++){
        if(tilingCanvases[i]) {
            tilingCanvases[i].remove();
            tilingPreviews[i].remove();
        }
    }
    tilingCanvases.length = 0;
    tilingCanvasCtx.length = 0;
    tilingPreviews.length = 0;
    tilingPreviewCtx.length = 0;
}

export const applyTiling = () => {
    if(!tilingActive) return;
    deleteTiles();
    if(orientation == "Horizontal"){
        tilingCanvases[3] = createDuplicateCanvas();
        tilingCanvasCtx[3] = tilingCanvases[3].getContext("2d");
        tilingPreviews[3] = createDuplicatePreview();
        tilingPreviewCtx[3] = tilingPreviews[3].getContext("2d");
        tilingCanvases[5] = createDuplicateCanvas();
        tilingCanvasCtx[5] = tilingCanvases[5].getContext("2d");
        tilingPreviews[5] = createDuplicatePreview();
        tilingPreviewCtx[5] = tilingPreviews[5].getContext("2d");
    }
    else if(orientation == "Vertical"){
        tilingCanvases[1] = createDuplicateCanvas();
        tilingCanvasCtx[1] = tilingCanvases[1].getContext("2d");
        tilingPreviews[1] = createDuplicatePreview();
        tilingPreviewCtx[1] = tilingPreviews[1].getContext("2d");
        tilingCanvases[7] = createDuplicateCanvas();
        tilingCanvasCtx[7] = tilingCanvases[7].getContext("2d");
        tilingPreviews[7] = createDuplicatePreview();
        tilingPreviewCtx[7] = tilingPreviews[7].getContext("2d");
    }
    else{
        for(let x = 0; x < 9; x++){
            if(x == 4) continue;
            tilingCanvases[x] = createDuplicateCanvas();
            tilingCanvasCtx[x] = tilingCanvases[x].getContext("2d");
            tilingPreviews[x] = createDuplicatePreview();
            tilingPreviewCtx[x] = tilingPreviews[x].getContext("2d");
        }
    }
    repositionTiles();
}


export const changeTiling = (setting) => {
    orientation = setting;
    applyTiling();
}

export const setTiling = (bool = false) => {
    tilingActive = bool;
    //console.log("Tiling " + (bool ? "activated" : "deactivated"))
    if(bool) applyTiling();
    else deleteTiles();
}

let animationTimer = null;
let animationFrameX = 16;
let animationFrameY = 16;
let animationTotalFrames = 2;
let animationGap = 0;
let currentFrame = 0;
let timer = 100;

const refreshAnimation = () => {
    clearInterval(animationTimer);
    animationTimer = setInterval(() => {
            
        const find = document.getElementById("canvas_animation");
        if(!find) return;
        const animationCtx = find.getContext("2d");

        animationCtx.clearRect(0, 0, animationFrameX, animationFrameY);
        const data = drawingCtx.getImageData(0, currentFrame * animationFrameY + (animationGap * currentFrame), animationFrameX, animationFrameY);
        animationCtx.putImageData(data, 0, 0);

        currentFrame++;
        if(currentFrame >= animationTotalFrames) currentFrame = 0;
        
    }, timer);
}

export const setAnimationGap = (int) => {
    animationGap = int;
    //console.log("Animation gap ", animationGap);
}

export const setAnimationSize = (x, y) => {
    animationFrameX = parseInt(x);
    animationFrameY = parseInt(y);

    const find = document.getElementById("canvas_animation");
    if(!find) return;
    find.width = animationFrameX;
    find.height = animationFrameY;
}

export const setAnimationFrames = (count) => {
    animationTotalFrames = parseInt(count);
    //console.log("Frame count ", animationTotalFrames);
    refreshAnimation();
}

export const setAnimationTiming = (timing) => {
    if(animationTimer) timer = timing;
    //console.log("Animation timing ", timing);
    refreshAnimation();
}

export const setAnimation = (bool = false) => {
    //console.log("Animation " + (bool ? "activated" : "deactivated"))
    if(bool){ // Activation
        refreshAnimation();
    }
    else{ // Deactivation
        if(animationTimer) {
            clearInterval(animationTimer);
            animationTimer = null;
        }
    }
}

export const setupClient = (imageURL = null) => {

    // =========================================================== //
    //      CLIENT SIDE VARIABLES / SETUP
    // =========================================================== //

    canvas_container = document.getElementById("canvas_container");
    canvas_drawing = document.getElementById("canvas_interaction");
    drawingCtx = canvas_drawing.getContext("2d");
    canvas_preview = document.getElementById("canvas_preview");
    previewCtx = canvas_preview.getContext("2d");
    canvas_grid = document.getElementById("canvas_grid");
    gridCtx = canvas_grid.getContext("2d");

    // Setting up imports
    setupView();
    setupDrawing();
    canvas_grid.style.visibility = "hidden"; // Grid is hidden by default

    setTool(new Pencil());

    // Create a new image on page load
    if(imageURL !== null){
        loadImage(imageURL);
    }
    else{
        createNewImage(16, 16);
    }
}
