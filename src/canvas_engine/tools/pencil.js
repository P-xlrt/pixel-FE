import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js";

class Pencil extends Tool {
    tool_started(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
    tool_moved(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
}

export default Pencil;