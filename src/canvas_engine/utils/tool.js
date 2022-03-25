import Colour from "./colour.js";
import Drawing from "./drawing.js" // Drawing = { applyChanges, setPixel, getPixel, getImageSize }
import View from "./view.js";

const emptyColour = new Colour(0, 0, 0, 0);

class Tool {
    constructor() {
        this._started = null;
        this._modifiedPixels = [];
        this._currentX = 0;
        this._currentY = 0;
    }
    getPixel(x, y){
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return null; // Makes sure the pixel coordinates are within the bounds of the image
        return Drawing.getPixel(x, y); // Returns a Colour class representing the colour of the chosen pixel on the drawing canvas
    }
    setPixel(x, y, colour = this.toolColour){
        const [imageSizeX, imageSizeY] = this.imageSize; // Gets the image size
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return; // Makes sure the pixel coordinates are within the bounds of the image
        this._modifiedPixels[x][y] = colour; // Sets the colour of the chosen pixel inside of the operation (canvas is changed later)
        if(colour) Drawing.setPixel(x, y, colour, true, true); // The preview canvas (not the main one) is updated to reflect what changes are being made
        else Drawing.setPixel(x, y, emptyColour, true, true); // If the colour is null, removes the pixel on the preview canvas
    }
    setupPixelRecording(){
        // 2D Array of pixels being changed in the operation
        // Default for every value is false, set to true if pixel is being changed.
        const [imageSizeX, _] = this.imageSize;
        this._modifiedPixels = [];
        for(let x = 0; x < imageSizeX; x++){
            this._modifiedPixels[x] = [];
        }
    }
    start(mouseButton, clientX, clientY){
        if(this.started !== null) return; // Don't start if tool is already started
        this._started = mouseButton; // Start the tool and record what mouse button was used
        this.setupPixelRecording(); // Sets up a blank tool operation
        const [x, y] = View.clientToCanvasCoordinate(clientX, clientY); // Get the pixel coordinates under the mouse
        this._currentX = x; // Sets the old pixel coordinates for mouseMove event
        this._currentY = y;
        this.tool_started(x, y); // Run the tool_started function
    }
    end(mouseButton, clientX, clientY){
        if(mouseButton !== this.started) return; // Don't end if the mouse button isn't the same as the currently used one
        const [x, y] = View.clientToCanvasCoordinate(clientX, clientY); // Get the pixel coordinates under the mouse
        this.tool_ended(x, y); // Run the tool_ended function
        Drawing.applyChanges(this._modifiedPixels); // Sends the operation over to the canvas drawing code
        this._started = null; // Reset the tool
    }
    mouseMove(clientX, clientY){
        if(this.started == null) return; // Don't run if the tool isn't being used
        const [x, y] = View.clientToCanvasCoordinate(clientX, clientY); // Get the pixel coordinates under the mouse
        if(x != this._currentX || y != this._currentY){ // Check if the current pixel is different to the old pixel
            this._currentX = x; // Update the old pixel coordinates
            this._currentY = y;
            this.tool_moved(x, y); // Run the tool_moved function
        }
    }
    get started(){
        return this._started; // Get the mouse button used to start the tool. null if the tool has yet to be started.
    }
    get toolColour() {
        return this._started == 0 ? Drawing.primaryColour : Drawing.secondaryColour; // Gets the tool colour assosciated with what mouse button was used
    }
    get imageSize(){
        return Drawing.getImageSize(); // Returns the image size
    }

    tool_started() {} // OVERRIDE THIS IN EXTENDED CLASSES
    tool_moved() {} // OVERRIDE THIS IN EXTENDED CLASSES
    tool_ended() {} // OVERRIDE THIS IN EXTENDED CLASSES
}

export default Tool;