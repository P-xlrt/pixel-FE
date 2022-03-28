import { undo, redo } from "./history";
import { setupView, changeZoom, offsetPosition, redrawGrid, applyResize } from "./view";
import { newImage, setupDrawing, applyChanges, getOverwriteColours, setOverwriteColours, getPixel, setPixel, deleteSelection } from "./drawing";
import Colour from "./colour";
import Pencil from "../tools/pencil";
import Eraser from "../tools/eraser";
import Colour_Picker from "../tools/colour_picker";
import Selection_Tool from "../tools/selection_tool";
import Move_Tool from "../tools/move_tool";

const setupClient = () => {

    // =========================================================== //
    //      CLIENT SIDE VARIABLES / SETUP
    // =========================================================== //

    const canvas_container = document.getElementById("canvas_container");
    const canvas_drawing = document.getElementById("canvas_interaction");
    const drawingCtx = canvas_drawing.getContext("2d");
    const canvas_preview = document.getElementById("canvas_preview");
    const previewCtx = canvas_preview.getContext("2d");
    const canvas_grid = document.getElementById("canvas_grid");
    const gridCtx = canvas_grid.getContext("2d");

    // Setting up imports
    setupView();
    setupDrawing();

    // Tools
    const emptyColour = new Colour(0, 0, 0, 0);
    let tool = null;
    const setTool = (newTool) => {
        if(tool) tool.tool_unselected();
        tool = newTool;
        tool.tool_selected();
    }
    setTool(new Pencil());

    // Image moving variables
    let panning = false;
    let cursorLocationX = 0;
    let cursorLocationY = 0;

    // Key press / unpress detection for the whole window
    // One key instruction at a time and only once, until it's unpressed
    let keyDebounce = null; 
    
    const createNewImage = (x = 16, y = 16) => {
        newImage(x, y);
    }

    // Selection
    let selX1 = null, selY1 = null, selX2 = null, selY2 = null;
    let selectedURL = null;
    const changeSelection = (x1, y1, x2, y2) => {
        selX1 = Math.max(Math.min(x1, x2), 0);
        selY1 = Math.max(Math.min(y1, y2), 0);
        selX2 = Math.min(Math.max(x1, x2), canvas_drawing.width);
        selY2 = Math.min(Math.max(y1, y2), canvas_drawing.width);
    }

    const validateSelection = () => {
        return selX1 !== null || selX2 !== null || selY1 !== null || selY2 !== null
    }

    // =========================================================== //
    //      FUNCTIONS
    // =========================================================== //

    // The Image class can be used in a canvas' drawImage function, which pastes the image onto the canvas.
    // The event handler for loading the image has to be done before the image's source is modified.
    // When the image is loaded from the URL, a new canvas is created and the image is put on it.
    const loadImage = (dataURL) => {
        let img = new Image();

        img.addEventListener("load", function () {
            console.log("Image loaded");

            createNewImage(img.width, img.height);
            drawingCtx.drawImage(img, 0, 0);

            img.remove();
            console.log("Done.");
        });

        img.src = dataURL;
    }

    const commenceUndo = () => {
        if(tool.specialType() == "Moving"){
            setTool(new Selection_Tool(changeSelection)); // Moving tools finalize their change when right mouse button is pressed.
        }
        undo();
    }

    const commenceRedo = () => {
        if(!tool.specialType() == "Moving"){
            redo();
        }
    }

    const startMove = () => {
        if(!validateSelection()) return;

        let historyEntry = [];
        let modifiedPixels = [];
        for(let x = 0; x <= selX2 - selX1; x++){
            modifiedPixels[x] = [];
            for(let y = 0; y <= selY2 - selY1; y++){

                const pixel = getPixel(selX1 + x, selY1 + y);

                if(!historyEntry[selX1 + x]) historyEntry[selX1 + x] = [];
                historyEntry[selX1 + x][selY1 + y] = pixel;

                modifiedPixels[x][y] = pixel // Grab the pixel from the canvas before clearing it
                setPixel(selX1 + x, selY1 + y, emptyColour, true); // Clear the pixel from the canvas
            }
        }

        setTool(new Move_Tool(modifiedPixels, selX1, selY1, historyEntry));
        selX1 = null, selY1 = null, selX2 = null, selY2 = null;
    }

    const copy = async () => {
        
        // If nothing selected, do nothing. 
        if(!validateSelection()) return; 

        console.log("(" + selX1 + ", " + selY1 + ")", "(" + selX2 + ", " + selY2 + ")");

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 1 + (selX2 - selX1);
        tempCanvas.height = 1 + (selY2 - selY1);
        const ctx = tempCanvas.getContext("2d");

        // Copy the selected pixels onto the temporary canvas
        for(let x = 0; x < tempCanvas.width; x++){
            for(let y = 0; y <= tempCanvas.height; y++){
                const pixel = drawingCtx.getImageData(selX1 + x, selY1 + y, 1, 1).data;
                //return new Colour(pixel[0], pixel[1], pixel[2], pixel[3] / 255);
                ctx.globalAlpha = pixel[3] / 255;
                ctx.fillStyle = Colour.generateRGB(pixel[0], pixel[1], pixel[2]);
                ctx.fillRect(x, y, 1, 1);
            }
        }

        selectedURL = tempCanvas.toDataURL();
        console.log(selectedURL);

        try {
            tempCanvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))
        } 
        catch (err) {
            console.log(err);
            //alert("An error occured. If you are using Firefox, type 'about:config' into the URL bar, search for 'dom.events.asyncClipboard.clipboardItem' and enable it.");
        }
        tempCanvas.remove();
    }

    const startPaste = (dataURL) => {
        let img = new Image();
        const tempCanvas = document.createElement("canvas");
        const ctx = tempCanvas.getContext("2d");

        img.addEventListener("load", function () {
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let modifiedPixels = [];

            for(let x = 0; x < tempCanvas.width; x++){
                modifiedPixels[x] = [];
                for(let y = 0; y < tempCanvas.height; y++){
                    const pixel = ctx.getImageData(x, y, 1, 1).data;
                    modifiedPixels[x][y] = new Colour(pixel[0], pixel[1], pixel[2], pixel[3] / 255);
                }
            }

            setTool(new Move_Tool(modifiedPixels, 0, 0, []));

            img.remove();
            tempCanvas.remove();
        });

        img.src = dataURL;
    }

    const getImageFromText = async text => {
        try{
            startPaste(text);
        }
        catch{
            console.log("Could not interpret pasted text as an image.");
        }
    }

    const paste = async () => {
        try {
            // Tries to read from the clipboard first
            const clipboardItem = (await navigator.clipboard.read())[0];
            console.log(clipboardItem);
            if(clipboardItem.types.includes("image/png")){ // Pasting an image
                console.log("Pasting an image");
                const dataURL = await clipboardItem.getType("image/png");
                console.log(URL.createObjectURL(dataURL));
                startPaste(URL.createObjectURL(dataURL));
            }
            else if(clipboardItem.types.includes("text/plain")){
                console.log("Pasting text");
                const dataURL = await clipboardItem.getType("text/plain");
                getImageFromText(await dataURL.text());
            }
            else{
                // Unknown paste data, try using backup copy instead.
                throw new Error();
            }
        }
        catch (err) {
            //alert("An error occured. If you are using Firefox, type 'about:config' into the URL bar, search for 'dom.events.asyncClipboard.read' and enable it.");
            // If we can't read from the clipboard (firefox settings), read from the selectedURL variable
            console.log("Plan B!");
            startPaste(selectedURL);
        }
    }

    // =========================================================== //
    //      EVENT HANDLERS
    // =========================================================== //

    // ----------------------------------------------
    // 		Mouse wheel

    // Mouse wheel detection on the canvas & background container
    canvas_container.addEventListener("wheel", e => {
        e.preventDefault();
        if(e.ctrlKey){
            changeZoom(e.deltaY, e.clientX, e.clientY); // Zoom
        }
        else{
            offsetPosition(0, e.deltaY); // Scroll
        }
    });


    // ----------------------------------------------
    // 		Key presses

    // Key press detection on the window (Can be used as shortcuts for tools or operations)
    window.addEventListener("keydown", (e) => {
        if(document.activeElement.classList.contains('keypress_input')) return;
        e.preventDefault();
        if(!keyDebounce){
            if(e.ctrlKey){
                if(e.code == "KeyZ"){ // Undo
                    keyDebounce = e.code;
                    commenceUndo();
                }
                else if(e.code == "KeyY"){ // Redo
                    keyDebounce = e.code;
                    commenceRedo()
                }
                else if(e.code == "KeyC"){ // Copy
                    keyDebounce = e.code;
                    copy();
                }
                else if(e.code == "KeyV"){ // Paste
                    keyDebounce = e.code;
                    paste();
                }
                else if(e.code == "KeyA"){
                    keyDebounce = e.code;
                    selX1 = 0; selX2 = canvas_drawing.width - 1;
                    selY1 = 0; selY2 = canvas_drawing.height - 1;
                    const tool = new Selection_Tool(changeSelection, [selX1, selY1, selX2, selY2])
                    setTool(tool);
                    tool.start();
                }
            }
            else if(e.code == "Delete"){ // Delete selection
                if(!validateSelection()) return;
                keyDebounce = e.code;
                deleteSelection(selX1, selY1, selX2, selY2);
            }
            else if(e.code == "KeyM"){ // Move
                if(!validateSelection()) return;
                keyDebounce = e.code;
                startMove();
            }
            else if(e.code == "KeyS"){
                keyDebounce = e.code;
                setTool(new Selection_Tool(changeSelection));
            }
            else if(e.code == "KeyP"){
                keyDebounce = e.code;
                setTool(new Pencil());
            }
        }
    });

    // Key unpress detection (Used to release the keyDebounce variable)
    window.addEventListener("keyup", (e) => {
        if(document.activeElement.id == "hex_input") return; // Don't do any keyboard inputs if user is trying to type in the hex input
    
        if(keyDebounce == e.code){
            keyDebounce = false;
        }
    });


    // ----------------------------------------------
    // 		Mouse move

    // Mouse move detection for the whole window
    window.addEventListener("mousemove", (e) => {
        if(panning){
            // Apply offset to old position
            offsetPosition(cursorLocationX - e.clientX, cursorLocationY - e.clientY);

            // Update the "old" position
            cursorLocationX = e.clientX;
            cursorLocationY = e.clientY;    
        }
        else{
            if(!tool) return;
            tool.mouseMove(e.clientX, e.clientY);
        }
    });

    // ----------------------------------------------
    // 		Mouse click

    // Mouse unclick detection for the whole window
    window.onmouseup = (e) => {
        if(e.button == 1){
            panning = false;
            return;
        }

        // End tool usage, don't do anything if tool doesn't exist or if the tool isn't started.
        if(!tool && !tool.started) return;
        tool.end(e.button, e.clientX, e.clientY);
    }

    // Prevents the right-click menu from working on canvas and background container (for using tools with secondary colour)
    canvas_container.oncontextmenu = (e) => { 
        e.preventDefault(); 
    }

    canvas_container.onmousedown = (e) => {
        if(e.button == 1){
            e.preventDefault();
            cursorLocationX = e.clientX;
            cursorLocationY = e.clientY;
            panning = true;
        }
        else{
            if (!tool) return;

            // Different rules for moving tool
            if(tool.specialType() == "Moving"){ 
                if(e.button == 0) tool.start(e.button, e.clientX, e.clientY); // Behave as normal if left mouse click is changed.
                else setTool(new Selection_Tool(changeSelection)); // Moving tools finalize their change when right mouse button is pressed.
                return; // Don't run anything else in this function.
            }

            // Every other tool
            if(e.button == 0 || e.button == 2) tool.start(e.button, e.clientX, e.clientY);
        }
    }

    // ----------------------------------------------
    // 		Toolbox buttons

    // When the user clicks this button, it creates a temporary anchor tag that is provided the image data and download attributes.
    // It's automatically clicked, which starts the download functionality on the browser. Once it's done, the anchor is deleted.
    document.getElementById("export_button").addEventListener("click", () => { 
        let a = document.createElement("a");
        a.href = canvas_drawing.toDataURL();
        a.setAttribute("download", "export.png"); // export.png can be changed to image title name
        a.click();
        a.remove();
    });

    // When a file has been selected, grab the file that was selected and create a URL that represents it.
    // The setDataUrl function is fired with this URL which changes the canvas image.
    document.getElementById("import_file").addEventListener("change", function() {  
        loadImage(URL.createObjectURL(this.files[0]));
    });

    // Undo / Redo buttons
    document.getElementById("undo_button").addEventListener("click", commenceUndo);
    document.getElementById("redo_button").addEventListener("click", commenceRedo);

    // Reset canvas view when the window is resized
    window.onresize = () => {
        applyResize();
    }

    // When the user clicks this button, it clicks the hidden import tag, which opens a file selection menu.
    // When a file is selected, the import tag's "change" event listener is fired.
    document.getElementById("import_button").addEventListener("click", (e) => {
        e.preventDefault();
        import_file.click();
    });

    // Toggle grid button
    canvas_grid.style.visibility = "hidden"; // Hidden by default
    document.getElementById("grid_button").addEventListener("click", () =>{
        canvas_grid.style.visibility = canvas_grid.style.visibility == "hidden" ? "visible" : "hidden";
        redrawGrid();
    });

    // Tool selection buttons
    document.getElementById("tool_pencil").addEventListener("click", () => {
        setTool(new Pencil());
    });

    document.getElementById("tool_eraser").addEventListener("click", () => {
        setTool(new Eraser());
    });

    document.getElementById("tool_colour_picker").addEventListener("click", () => {
        setTool(new Colour_Picker());
    });

    document.getElementById("tool_selection").addEventListener("click", () => {
        setTool(new Selection_Tool(changeSelection));
    });

    document.getElementById("overwrite_button").addEventListener("click", () => setOverwriteColours(!getOverwriteColours()));
    document.getElementById("tool_move").addEventListener("click", startMove);
    document.getElementById("paste_button").addEventListener("click", paste);
    document.getElementById("copy_button").addEventListener("click", copy);

    // Create a new image on page load
    createNewImage(32, 16);
}

export default setupClient;