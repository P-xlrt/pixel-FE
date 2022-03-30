import Colour from "../utils/colour.js";
import Tool from "../utils/tool.js"; // Imports the tool

class TEMPLATE_TOOL extends Tool { // Must extend the imported tool

    // The Tool class' constructor does everything this tool needs to run, and thus a constructor for your tool is optional.
    // If you wish to create a constructor for your tool, make sure the first line inside the constructor is "super()".
    // constructor(){
    //     super(); // DO NOT TOUCH THIS LINE
    //     // CONSTRUCTOR CODE GOES HERE
    // }

    // The function that runs when the mouse buttons are pressed down
    // canvasX and canvasY are the coordinates of where the mouse is on the canvas
    tool_started(canvasX, canvasY){ 

    }

    // The function that runs when the mouse moves over a different pixel when the tool is active
    // canvasX and canvasY are the coordinates of where the mouse is on the canvas
    tool_moved(canvasX, canvasY){ 
        
    }

    // The function that runs when the mouse buttons are released
    // canvasX and canvasY are the coordinates of where the mouse is on the canvas
    tool_ended(canvasX, canvasY){ 

    }


    // You can add your own custom functions and give them custom parameters, but they do not do anything by themselves.
    // You must call these in either tool_started(), tool_moved(), or tool_ended()
    custom_function(customParametersGoHere, canvasX, canvasY) {

        // ======================================================================= //
        //      SETTING PIXELS
        // ======================================================================= //

        // Allows you to change a specific pixel on the canvas using the tool's selected colour
        // Function returns nothing.
        // Requires two arguments: X coordinate and Y coordinate
        this.setPixel(canvasX, canvasY);

        // Allows you to cancel a change to the
        // Function returns nothing.
        // Requires three arguments: X coordinate, Y coordinate, and null to remove the colour
        this.setPixel(canvasX, canvasY, null);
        
        // Allows you to change a specific pixel on the canvas, overriding the tool's selected colour.
        // Function returns nothing.
        // Requires three arguments: X coordinate, Y coordinate, and custom colour
        this.setPixel(canvasX, canvasY, pixelColour);

        // ======================================================================= //
        //      READING PIXELS / OTHER IMAGE PROPERIES
        // ======================================================================= //

        // Allows you to read the colour of a specific pixel on the canvas.
        // Function returns a Colour class (canvas_engine/utils/colour.js) OR null if coordinates are outside of the bounds of the image.
        // Requires two arguments: X coordinate and Y coordinate.
        let pixelColour = this.getPixel(canvasX, canvasY);

        // Allows you to read the image size (e.g. a 16x16 image would return [16, 16]).
        // Returns an array of two coordinates. You can use [imageSizeX, imageSizeY] instead of array[0] and array[1];
        const [imageSizeX, imageSizeY] = this.imageSize;

        // Allows you to read the colour the tool is currently using.
        // Returns a Colour class (canvas_engine/utils/colour.js)
        const colour = this.toolColour;
    }
}

export default TEMPLATE_TOOL;