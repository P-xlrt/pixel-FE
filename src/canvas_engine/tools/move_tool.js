import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool
import { setPixel, applyChangesMove, setCanvasArea } from "../utils/drawing";

const overlayColour = new Colour(0, 0, 0, 0.5);
const emptyColour = new Colour(0, 0, 0, 0);

class Move_Tool extends Tool { // Must extend the imported tool

    constructor(modifiedPixels, canvasX, canvasY, history){
        super();
        this._movingImage = modifiedPixels;
        this._positionX = canvasX;
        this._positionY = canvasY;
        this._history = history;
    }

    setPixel(x, y, colour = emptyColour){ // Override the default setPixel behaviour
        const [imageSizeX, imageSizeY] = this.imageSize; // Gets the image size
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return; // Makes sure the pixel coordinates are within the bounds of the image
        setPixel(x, y, colour, true, true); // The preview canvas (not the main one) is updated to reflect what changes are being made
    }

    redrawImage(canvasX, canvasY){
        this._positionX = canvasX;
        this._positionY = canvasY;

        this.clearPreview(); // Reset the preview image

        this._movingImage.forEach((yArray, x) => {
            yArray.forEach((colour, y) => {
                this.setPixel(this._positionX + x, this._positionY + y, colour);
            })
        });

        setCanvasArea(this._positionX, this._positionY, this._movingImage.length, this._movingImage[0].length, overlayColour);
    }

    tool_moved(canvasX, canvasY){ 
        this.redrawImage(canvasX, canvasY);
    }

    start(mouseButton, clientX, clientY){
        if(mouseButton == 0){ // Left mouse click
            if(this.started !== null) return; // Don't start if tool is already started
            super.start(mouseButton, clientX, clientY);
        }
    }

    end(mouseButton){
        if(mouseButton !== this.started) return; // Don't end if the mouse button isn't the same as the currently used one
        this._started = null; // Reset the tool
    }

    tool_selected(){
        this.redrawImage(this._positionX, this._positionY);
    }

    tool_unselected() {
        let final = [];
        this._movingImage.forEach((yArray, x) => {
            final[this._positionX + x] = [];
            yArray.forEach((colour, y) => {
                final[this._positionX + x][this._positionY + y] = colour;
            })
        });
        applyChangesMove(final, this._history); // Sends the operation over to the canvas drawing code
    }

    specialType(){
        return "Moving";
    }
}

export default Move_Tool;