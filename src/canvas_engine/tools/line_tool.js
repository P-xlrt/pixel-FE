import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool

class Line_Tool extends Tool { // Must extend the imported tool

    constructor(){
        super(); // DO NOT TOUCH THIS LINE
        this._buttonID = "tool_line";
    }

    redraw(canvasX, canvasY) {
        this.clearPreview(); // Clears the preview canvas
        this.setupPixelRecording(); // Resets the changed pixels

        let xDif = this._originX - canvasX;
        let yDif = this._originY - canvasY;

        if(Math.abs(xDif) == Math.abs(yDif)){
            let y = 0;
            for(let x = 0; Math.abs(x) <= Math.abs(xDif); x += xDif < 0 ? 1 : -1){
                this.setPixel(this._originX + x, this._originY + y, this.toolColour);
                y += yDif < 0 ? 1 : -1;
            }
        }
        else if (Math.abs(xDif) > Math.abs(yDif)){
            const gradient = Math.abs(yDif) / Math.abs(xDif);
            let y = 0;
            for(let x = 0; Math.abs(x) <= Math.abs(xDif); x += xDif < 0 ? 1 : -1){
                this.setPixel(this._originX + x, Math.round(this._originY + y), this.toolColour);
                y += yDif < 0 ? gradient : -gradient;
            }
        }
        else{
            const gradient = Math.abs(xDif) / Math.abs(yDif);
            let x = 0;
            for(let y = 0; Math.abs(y) <= Math.abs(yDif); y += yDif < 0 ? 1 : -1){
                this.setPixel(Math.round(this._originX + x), this._originY + y, this.toolColour);
                x += xDif < 0 ? gradient : -gradient;
            }
        }
    }

    tool_started(canvasX, canvasY){ 
        this._originX = canvasX;
        this._originY = canvasY;
        this.redraw(canvasX, canvasY)
    }

    tool_moved(canvasX, canvasY){ 
        this.redraw(canvasX, canvasY)
    }
}

export default Line_Tool;