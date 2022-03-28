import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool
import { setPixel } from "../utils/drawing";

const overlayColour = new Colour(0, 0, 0, 0.5);
const emptyColour = new Colour(0, 0, 0, 0);

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
        for(let x = Math.min(this._startPosX, this._endPosX); x <= Math.max(this._startPosX, this._endPosX); x++){
            for(let y = Math.min(this._startPosY, this._endPosY); y <= Math.max(this._startPosY, this._endPosY); y++){
                this.setPixel(x, y, emptyColour);
            }
        }
    }

    addOverlay() {
        // Add new overlay
        for(let x = Math.min(this._startPosX, this._endPosX); x <= Math.max(this._startPosX, this._endPosX); x++){
            for(let y = Math.min(this._startPosY, this._endPosY); y <= Math.max(this._startPosY, this._endPosY); y++){
                this.setPixel(x, y, overlayColour);
            }
        }
    }

    tool_started(canvasX, canvasY){ 
        this.removeOverlay();
        if(this._defaultSelection !== null){
            this._startPosX = this._defaultSelection[0];
            this._startPosY = this._defaultSelection[1];
            this._endPosX = this._defaultSelection[2];
            this._endPosY = this._defaultSelection[3];
            console.log(this._startPosX, this._startPosY);
            console.log(this._endPosX, this._endPosY);
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