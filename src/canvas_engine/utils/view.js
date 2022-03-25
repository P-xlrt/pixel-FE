import { getImageSize } from "./drawing.js";
import Colour from "./colour.js";

const canvas_container = document.getElementById("canvas_container");
const canvas_drawing = document.getElementById("canvas_interaction");
const drawingCtx = canvas_drawing.getContext("2d");
const canvas_preview = document.getElementById("canvas_preview");
const previewCtx = canvas_preview.getContext("2d");
const canvas_grid = document.getElementById("canvas_grid");
const gridCtx = canvas_grid.getContext("2d");

// Get the screen coordinates of the middle of the canvas' container
let screenHalfX = canvas_container.getBoundingClientRect().left + canvas_container.clientWidth / 2;
let screenHalfY = canvas_container.getBoundingClientRect().top + canvas_container.clientHeight / 2;

// Tracks the current Canvas element's size
let canvasCurrentSizeX = 0;
let canvasCurrentSizeY = 0;

// Tracks where the person is viewing in relation to the Canvas element's location (Canvas always at coordinates [0, 0] )
let cameraX = 0;
let cameraY = 0;

const resetCameraLocation = () => {
    cameraX = 0;
    cameraY = 0;
}

// Image zooming variables
let zoom = 1;
let zoomMin = 1;
let zoomMax = 250;
let canvasOriginalSizeX = 0;
let canvasOriginalSizeY = 0;
let pixelSize = 50;

// Converts the position of the client to a pixel coordinate on the canvas
export const clientToCanvasCoordinate = (clientX, clientY) => {
    const canvas_position = canvas_drawing.getBoundingClientRect();
    return [Math.floor((clientX - canvas_position.left) / pixelSize / zoom), Math.floor((clientY - canvas_position.top) / pixelSize / zoom)];
}

const applyPosition = () => {
    // Styling needs "px" at the end because it's CSS

    let x = Math.round(screenHalfX - (cameraX * zoom));
    let y = Math.round(screenHalfY - (cameraY * zoom));
    
    // Set canvas position
    canvas_drawing.style.left = Math.round(x - canvasCurrentSizeX / 2) + "px";
    canvas_drawing.style.top = Math.round(y - canvasCurrentSizeY / 2) + "px";

    // Copy other two canvas positions
    canvas_preview.style.left = canvas_drawing.style.left;
    canvas_preview.style.top = canvas_drawing.style.top;
    // canvas_grid.style.left = canvas_drawing.style.left;
    // canvas_grid.style.top = canvas_drawing.style.top;
    redrawGrid();
}

export const offsetPosition = (cameraOffsetX, cameraOffsetY) => {
    cameraX += cameraOffsetX / zoom;
    cameraY += cameraOffsetY / zoom;
    applyPosition();
}

const applyZoom = (x, y) => {
    canvasCurrentSizeX = Math.floor(x);
    canvasCurrentSizeY = Math.floor(y);
    // Set canvas size
    canvas_drawing.style.width = canvasCurrentSizeX + "px";
    canvas_drawing.style.height = canvasCurrentSizeY + "px";

    // Copy other two canvas sizes
    canvas_preview.style.width = canvas_drawing.style.width;
    canvas_preview.style.height = canvas_drawing.style.height;
    // canvas_grid.style.width = canvas_drawing.style.width;
    // canvas_grid.style.height = canvas_drawing.style.height;
    applyPosition();
    redrawGrid();
}

export const changeZoom = (delta, clientX = screenHalfX, clientY = screenHalfY) => {
    zoom -= (delta / 250); // Zoom speed depends on the image size?

    if(delta > 0){
        if(zoom < zoomMin) zoom = zoomMin;
        else{
            let xDif = (screenHalfX - clientX) / zoom;
            let yDif = (screenHalfY - clientY) / zoom;

            xDif = canvas_drawing.clientLeft + xDif / 5;
            yDif = canvas_drawing.clientTop + yDif / 5;

            cameraX += xDif; 
            cameraY += yDif
        }
    }
    else{
        if(zoom > zoomMax) zoom = zoomMax;
        else{
            let xDif = (screenHalfX - clientX) / zoom;
            let yDif = (screenHalfY - clientY) / zoom;

            xDif = canvas_drawing.clientLeft + xDif / 5;
            yDif = canvas_drawing.clientTop + yDif / 5;

            cameraX -= xDif; 
            cameraY -= yDif
        }
    }
    
    applyZoom(canvasOriginalSizeX * zoom, canvasOriginalSizeY * zoom);
}

// Set up grid's line drawing styling
gridCtx.fillStyle = "black";
gridCtx.lineWidth = 2;
gridCtx.setLineDash([]);

export const redrawGrid = () => {

    // Reset the grid's image and size
    const spacing = pixelSize * zoom;
    const gridPos = canvas_grid.getBoundingClientRect();
    canvas_grid.width = gridPos.width;
    canvas_grid.height = gridPos.height;
    
    // If the pixel size is too small or the grid is hidden, don't draw lines


    if(canvas_grid.style.visibility == "hidden" || spacing < 10) return; // Different line size depending on smaller spacing?
    const canvasPos = canvas_drawing.getBoundingClientRect();
    gridCtx.imageSmoothingEnabled = false;

    // Implementation 4, same size as canvas container, image has same resolution as canvas container, positioned at canvas container
    const xDif = (gridPos.left - canvasPos.left) % spacing;
    for(let x = gridPos.left; x < gridPos.right; x += spacing){
        if(x > canvasPos.left && x < canvasPos.right){
            gridCtx.fillRect(x - xDif - gridPos.left - 1, canvasPos.top - gridPos.top, 2, canvasPos.height);
        }
    }

    const yDif = (gridPos.top - canvasPos.top) % spacing;
    for(let y = gridPos.top; y < gridPos.bottom; y += spacing){ // for(let y = gridPos.top; y < gridPos.bottom + 200; y += spacing){ 
        if(y > canvasPos.top && y < canvasPos.bottom){
            gridCtx.fillRect(canvasPos.left - gridPos.left, y - yDif - gridPos.top - 1, canvasPos.width, 2);
        }
    }

    // for(let x = (canvasPos.left % spacing); x < gridPos.right; x += spacing){
    //     if(x > canvasPos.left && x < canvasPos.right){
    //         count++;
    //         console.log(count, x)
    //         gridCtx.fillStyle = Colour.generateRGB(count * 10, 0, 0);
    //         gridCtx.fillRect(x - (gridPos.left / zoom) - 1, canvasPos.top - gridPos.top + ((count-1) * 5), 2, canvasPos.height);
    //     }
    // }
    // const [imageSizeX, imageSizeY] = Drawing.getImageSize();
    // canvas_grid.width = imageSizeX * pixelSize;// imageSizeX * spacing; // Old implementations 1 & 2 use imageSizeX * pixelSize
    // canvas_grid.height = imageSizeY * pixelSize;// * spacing;



    // Old implementation, would draw every line on the grid (1024x1024 grids were very slow to draw)
    // for(let x = 1; x < imageSizeX; x++){
    //     const posX = Math.round(x * spacing);
    //     gridCtx.beginPath();
    //     gridCtx.moveTo(posX, 0);
    //     gridCtx.lineTo(posX, canvas_grid.height);
    //     gridCtx.stroke();
    // }
    // for(let y = 1; y < imageSizeY; y++){
    //     const posY = Math.round(y * spacing);
    //     gridCtx.beginPath();
    //     gridCtx.moveTo(0, posY);
    //     gridCtx.lineTo(canvas_grid.width, posY);
    //     gridCtx.stroke();
    // }
    

    // Old implementation 2, grid stops drawing when zoomed in too much (max size breached)
    // const canvasPos = canvas_grid.getBoundingClientRect()
    // for(let x = canvasPos.left % spacing; x < window.innerWidth; x += spacing){
    //     if(x > canvasPos.left && x < canvasPos.right){
    //         const posX = x - canvasPos.left;
    //         gridCtx.fillRect(posX - 1, 0, 2, canvas_grid.height);
    //         // gridCtx.beginPath();
    //         // gridCtx.moveTo(posX, 0);
    //         // gridCtx.lineTo(posX, canvas_grid.height);
    //         // gridCtx.stroke();
    //     }
    // }
    // for(let y = canvasPos.top % spacing; y < window.innerHeight; y += spacing){
    //     if(y > canvasPos.top && y < canvasPos.bottom){
    //         const posY = y - canvasPos.top
    //         gridCtx.fillRect(0, posY - 1, canvas_grid.width, 2)
    //         // gridCtx.beginPath();
    //         // gridCtx.moveTo(0, posY);
    //         // gridCtx.lineTo(canvas_grid.width, posY);
    //         // gridCtx.stroke();
    //     }
    // }



    // Old implementation 3, grid lines are too thick because grid image isn't scaled up
    // for(let x = canvasPos.left % spacing; x < window.innerWidth; x += spacing){
    //     if(x > canvasPos.left + 1 && x < canvasPos.right - 1){
    //         gridCtx.fillRect((x - canvasPos.left) / zoom - 1, 0, 2, canvas_grid.height);
    //     }
    // }
    // for(let y = canvasPos.top % spacing; y < window.innerHeight; y += spacing){
    //     if(y > canvasPos.top && y < canvasPos.bottom){
    //         gridCtx.fillRect(0, (y - canvasPos.top) / zoom - 1, canvas_grid.width, 2)
    //     }
    // }
}

export const applyResize = () => {
    zoom = 1;
    screenHalfX = canvas_container.getBoundingClientRect().left + canvas_container.clientWidth / 2;
    screenHalfY = canvas_container.getBoundingClientRect().top + canvas_container.clientHeight / 2;

    const [imageSizeX, imageSizeY] = getImageSize();
    const canvasWHRatio = imageSizeX / imageSizeY;
    const viewportX = canvas_container.clientWidth / 1.5;
    const viewportY = canvas_container.clientHeight / 1.5;

    if(canvasWHRatio == 1){
        if(imageSizeY > imageSizeX){
            canvas_drawing.style.width = viewportX + "px";
            canvas_drawing.style.height = viewportX + "px";
        }
        else{
            canvas_drawing.style.height = viewportY + "px";
            canvas_drawing.style.width = viewportY + "px";
        }
        pixelSize = canvas_drawing.clientWidth / imageSizeX;
    }
    else if(canvasWHRatio < 1){
        canvas_drawing.style.height = viewportY + "px";
        canvas_drawing.style.width = viewportY * canvasWHRatio + "px";
        pixelSize = canvas_drawing.clientHeight / imageSizeY;
    }
    else{
        canvas_drawing.style.width = viewportX + "px";
        canvas_drawing.style.height = viewportX / canvasWHRatio + "px";
        pixelSize = canvas_drawing.clientWidth / imageSizeX;
    }

    canvasOriginalSizeX = canvas_drawing.clientWidth;
    canvasOriginalSizeY = canvas_drawing.clientHeight;
    
    applyZoom(canvasOriginalSizeX, canvasOriginalSizeY);
    applyPosition();
    resetCameraLocation();
    redrawGrid();
}