import { applyChanges } from "../utils/drawing.js";
import Tool from "../utils/tool.js";
import { clientToCanvasCoordinate } from "../utils/view.js";

class Flood_Fill extends Tool {
    constructor(){
        super(); // DO NOT TOUCH THIS LINE
        this._buttonID = "tool_fill";
    }

    compare(colour1, colour2){
        return colour1.r === colour2.r && colour1.g === colour2.g && colour1.b === colour2.b && colour1.a === colour2.a;
    }

    setPixel(x, y, colour = this.toolColour){ // Removed the preview image editing since the changes happen instantly anyway
        const [imageSizeX, imageSizeY] = this.imageSize; // Gets the image size
        if(x < 0 || x >= imageSizeX || y < 0 || y >= imageSizeY) return; // Makes sure the pixel coordinates are within the bounds of the image
        this._modifiedPixels[x][y] = colour; // Sets the colour of the chosen pixel inside of the operation (canvas is changed later)
    }

    end(mouseButton, clientX, clientY){
        if(mouseButton !== this.started) return; // Don't end if the mouse button isn't the same as the currently used one
        const [x, y] = clientToCanvasCoordinate(clientX, clientY); // Get the pixel coordinates under the mouse

        const [imgSizeX, imgSizeY] = this.imageSize;
        const searchingColour = this.getPixel(x, y);
        this.setPixel(x, y, this.toolColour); // Initial set

        let currentSearch = [];
        currentSearch.push({x, y});
        let nextSearch = [];

        const check = (newX, newY) => {  
            if(newX < 0 || newX >= imgSizeX || newY < 0 || newY >= imgSizeY) return; // Check to see if the coordinate is within bounds
            // If the pixel has not yet been modified AND it's the same colour as the starting pixel
            if(!this._modifiedPixels[newX][newY] && this.compare(searchingColour, this.getPixel(newX, newY))){ 
                nextSearch.push({x: newX, y: newY}); // Push it to the next searching array
                this.setPixel(newX, newY, this.toolColour); // Change the pixel colour
            }
        }

        console.log("Search start");
        // Iterate through all the locations to be checked
        while(currentSearch.length > 0){       
            for(let i = 0; i < currentSearch.length; i++){
                check(currentSearch[i].x + 1, currentSearch[i].y);
                check(currentSearch[i].x - 1, currentSearch[i].y);
                check(currentSearch[i].x, currentSearch[i].y + 1);
                check(currentSearch[i].x, currentSearch[i].y - 1);
            }
            // Copy the next array into the current array
            currentSearch = [...nextSearch];
            nextSearch.length = 0;
        }
        console.log("Search end");

        applyChanges(this._modifiedPixels, this._removePreviewOnEnd, false); // Sends the operation over to the canvas drawing code
        this._started = null; // Reset the tool
    }
}

export default Flood_Fill;