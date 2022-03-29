import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool
import { setPixel, deleteCanvasArea, setCanvasArea } from "../utils/drawing";

const overlayColour = new Colour(0, 0, 0, 0.2);

class Selection_Tool extends Tool { // Must extend the imported tool

    constructor(selectorFunction, defaultSelection = null){
        super();
        this._changeSelection = selectorFunction;
        this._removePreviewOnEnd = false;
        this._defaultSelection = defaultSelection;
    }

    setPixel(x, y, colour){ // Override the default setPixel behaviour
        const [imageSizeX, imageSizeY] = this.imageSize; // Gets the image size
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return; // Makes sure the pixel coordinates are within the bounds of the image
        setPixel(x, y, colour, true, true); // The preview canvas (not the main one) is updated to reflect what changes are being made
    }

    removeOverlay(){
        // Remove overlay
        const xPos = Math.min(this._startPosX, this._endPosX);
        const yPos = Math.min(this._startPosY, this._endPosY);

        deleteCanvasArea(xPos, yPos, Math.max(this._startPosX, this._endPosX) - xPos + 1, Math.max(this._startPosY, this._endPosY) - yPos + 1);
    }

    addOverlay() {
        // Add new overlay
        const xPos = Math.min(this._startPosX, this._endPosX);
        const yPos = Math.min(this._startPosY, this._endPosY);

        setCanvasArea(xPos, yPos, Math.max(this._startPosX, this._endPosX) - xPos + 1, Math.max(this._startPosY, this._endPosY) - yPos + 1, overlayColour);
    }

    tool_started(canvasX, canvasY){ 
        this.removeOverlay();
        if(this._defaultSelection !== null){
            this._startPosX = this._defaultSelection[0];
            this._startPosY = this._defaultSelection[1];
            this._endPosX = this._defaultSelection[2];
            this._endPosY = this._defaultSelection[3];
        }
        else{
            this._startPosX = canvasX;
            this._startPosY = canvasY;
            this._endPosX = canvasX;
            this._endPosY = canvasY;
        }

        this.addOverlay();
    }

    tool_moved(canvasX, canvasY){ 
        this.removeOverlay();
        // Change positions
        this._endPosX = canvasX;
        this._endPosY = canvasY;

        this.addOverlay();
    }

    tool_ended(canvasX, canvasY){ 
        this._changeSelection(this._startPosX, this._startPosY, this._endPosX, this._endPosY);
    }

    tool_unselected(){
        this.removeOverlay();
    }
}

export default Selection_Tool;