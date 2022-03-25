import Tool from "../utils/tool.js";

class Flood_Fill extends Tool {
    tool_started(canvasX, canvasY){
        //console.log("Started flood fill at", canvasX, canvasY);

        console.log(this.getPixel(canvasX, canvasY));
        this.tool_ended();
    }
}

export default Flood_Fill;