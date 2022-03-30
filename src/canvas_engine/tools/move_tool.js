import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool
import { applyChangesMove, setCanvasArea } from "../utils/drawing";

const overlayColour = new Colour(0, 0, 0, 0.5);

class Move_Tool extends Tool { // Must extend the imported tool

    constructor(modifiedPixels, canvasX, canvasY){
        super();
        this._movingImage = modifiedPixels;
        this._positionX = canvasX;
        this._positionY = canvasY;
        this._buttonID = "tool_move";
    }

    redrawImage(canvasX, canvasY){
        this._positionX = canvasX;
        this._positionY = canvasY;

        this.clearPreview(); // Reset the preview image

        document.getElementById("canvas_preview").getContext("2d").putImageData(this._movingImage, this._positionX, this._positionY);

        setCanvasArea(this._positionX, this._positionY, this._movingImage.width, this._movingImage.height, overlayColour);
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
        applyChangesMove(this._movingImage, this._currentX, this._currentY);
    }

    specialType(){
        return "Moving";
    }
}

export default Move_Tool;