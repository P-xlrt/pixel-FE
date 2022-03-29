import Tool from "../utils/tool.js";

class Flood_Fill extends Tool {

    compare(colour1, colour2){
        return colour1.r === colour2.r && colour1.g === colour2.g && colour1.g === colour2.b && colour1.a === colour2.a;
    }

    tool_ended(canvasX, canvasY){
        const [imgSizeX, imgSizeY] = this.imageSize;
        const searchingColour = this.getPixel(canvasX, canvasY)

        let currentSearch = [];
        currentSearch.push({x: canvasX, y: canvasY});
        let nextSearch = [];
       
        const check = (newX, newY) => {  
            if(newX < 0 || newX >= imgSizeX || newY < 0 || newY >= imgSizeY) return; // Check to see if the coordinate is within bounds

            // If the pixel has not yet been modified AND it's the same colour as the starting pixel
            if(this._modifiedPixels[newX][newY] === undefined && this.compare(searchingColour, this.getPixel(newX, newY))){ 
                nextSearch.push({x: newX, y: newY}); // Push it to the next searching array
                this.setPixel(newX, newY, this.toolColour); // Change the pixel colour
            }
        }

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
    }
}

export default Flood_Fill;