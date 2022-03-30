import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool
import { clientToCanvasCoordinate } from "../utils/view.js";
import { deleteCanvasArea, setCanvasArea } from "../utils/drawing";

const overlayColour = new Colour(0, 0, 0, 0.2);

class Selection_Tool extends Tool { // Must extend the imported tool

    constructor(selectorFunction, defaultSelection = null){
        super();
        this._changeSelection = selectorFunction;
        this._removePreviewOnEnd = false;
        this._defaultSelection = defaultSelection;
        this._buttonID = "tool_selection";
    }

    end(mouseButton, clientX, clientY){
        if(mouseButton !== this.started) return; // Don't end if the mouse button isn't the same as the currently used one
        const [x, y] = clientToCanvasCoordinate(clientX, clientY); // Get the pixel coordinates under the mouse
        this._changeSelection(this._startPosX, this._startPosY, this._endPosX, this._endPosY);
        this._started = null; // Reset the tool
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

    tool_unselected(){
        this.removeOverlay();
    }
}

export default Selection_Tool;