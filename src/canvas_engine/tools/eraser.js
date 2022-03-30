import Colour from "../utils/colour";
import Tool from "../utils/tool";
import { setPixel, setOverwriteColours, getOverwriteColours} from "../utils/drawing"

const eraserColour = new Colour(0, 0, 0, 0);
const overlayColour = new Colour(0, 0, 0, 0.5);

class Eraser extends Tool {
    constructor(){
        super(); // DO NOT TOUCH THIS LINE
        this._buttonID = "tool_eraser";
    }
    setPixel(x, y){ // Override the default setPixel behaviour
        const [imageSizeX, imageSizeY] = this.imageSize; // Gets the image size
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return; // Makes sure the pixel coordinates are within the bounds of the image
        this._modifiedPixels[x][y] = eraserColour; // Sets the colour of the chosen pixel inside of the operation (canvas is changed later)
        setPixel(x, y, overlayColour, true, true); // The preview canvas (not the main one) is updated to reflect what changes are being made
    }
    tool_started(canvasX, canvasY){
        this.setPixel(canvasX, canvasY); 
    }
    tool_moved(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
    tool_selected(){
        this._overwriteSettings = getOverwriteColours();
        setOverwriteColours(true);
    }
    tool_unselected(){
        setOverwriteColours(this._overwriteSettings);
    }
}

export default Eraser;