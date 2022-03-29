import Tool from "../utils/tool.js"; // Imports the tool

class Circle_Tool extends Tool { // Must extend the imported tool

    // a^2 + b^2 = c^2
    // Magnitude is the difference between two vectors
    calculateMagnitude(a, b){
        return Math.round(Math.sqrt((a * a) + (b * b)));
    }

    redraw(currentX, currentY) {
        this.clearPreview(); // Clears current preview
        this.setupPixelRecording(); // Resets the changed pixels

        // Calculate the circle's radius
        const radius = this.calculateMagnitude(currentX - this._originX, currentY - this._originY);

        // Iterate through the pixels where the circle could be
        // If the magnitude between [originX, originY] and [x, y] is less than the radius, it's part of the circle
        // If it's an outline, the difference between the radius constant and the magnitude must be less than or equal to one
        for(let x = this._originX - radius; x <= this._originX + radius; x++){
            for(let y = this._originY - radius; y <= this._originY + radius; y++){
                if(Math.abs(this.calculateMagnitude(this._originX - x, this._originY - y) - radius) < 1) this.setPixel(x, y, this.toolColour);
            }
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

export default Circle_Tool;