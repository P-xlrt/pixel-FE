import Colour from "../utils/colour";
import Tool from "../utils/tool"; // Imports the tool
import { setToolColour } from "../utils/drawing" // Imports setToolColour

class Colour_Picker extends Tool {
    tool_ended(canvasX, canvasY){ 
        setToolColour(this.started, this.getPixel(canvasX, canvasY));
    }
}

export default Colour_Picker;