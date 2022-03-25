import Colour from "../utils/colour";
import Tool from "../utils/tool";

class Pencil extends Tool {
    tool_started(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
    tool_moved(canvasX, canvasY){
        this.setPixel(canvasX, canvasY);
    }
}

export default Pencil;