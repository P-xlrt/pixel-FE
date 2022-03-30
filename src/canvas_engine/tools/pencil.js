import Colour from "../utils/colour";
import Tool from "../utils/tool";

class Pencil extends Tool {
    constructor(){
        super(); // DO NOT TOUCH THIS LINE
        this._buttonID = "tool_pencil";
    }
    tool_started(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
    tool_moved(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
}

export default Pencil;