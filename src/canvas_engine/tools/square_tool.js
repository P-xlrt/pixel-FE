import Tool from "../utils/tool.js"; // Imports the tool

class Square_Tool extends Tool { // Must extend the imported tool

    constructor(){
        super(); // DO NOT TOUCH THIS LINE
        this._buttonID = "tool_square";
    }

    redraw(currentX, currentY) {
        this.clearPreview(); // Clears current preview
        this.setupPixelRecording(); // Resets the changed pixels

        // Draw both vertical lines
        for(let x = Math.min(currentX, this._originX); x <= Math.max(currentX, this._originX); x++){
            this.setPixel(x, this._originY, this.toolColour);
            this.setPixel(x, currentY, this.toolColour);
        }

        // Draw both horizontal lines
        for(let y = Math.min(currentY, this._originY); y <= Math.max(currentY, this._originY); y++){
            this.setPixel(this._originX, y, this.toolColour);
            this.setPixel(currentX, y, this.toolColour);
        }
    }

    tool_started(canvasX, canvasY){ 
        this._originX = canvasX;
        this._originY = canvasY;
        this.redraw(canvasX, canvasY);
    }

    tool_moved(canvasX, canvasY){ 
        this.redraw(canvasX, canvasY);
    }
}

export default Square_Tool;