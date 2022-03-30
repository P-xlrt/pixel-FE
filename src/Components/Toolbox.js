import { useState } from "react";
import { changeHex, changeSlider, toggleOverwriteColours, getDataURL, swapColours, updateModifyingColour, changeImageSizeValue } from "../canvas_engine/utils/drawing";
import { commenceUndo, commenceRedo, exportImage, setTool, copy, paste, startMove, changeSelection, toggleGrid, cut } from "../canvas_engine/utils/canvas_client";
import { saveImage, updateImage } from "../utils/imageRequests"; 
import Pencil from "../canvas_engine/tools/pencil";
import Eraser from "../canvas_engine/tools/eraser";
import Colour_Picker from "../canvas_engine/tools/colour_picker";
import Selection_Tool from "../canvas_engine/tools/selection_tool";
import Flood_Fill from "../canvas_engine/tools/flood_fill";
import Square_Tool from "../canvas_engine/tools/square_tool";
import Circle_Tool from "../canvas_engine/tools/circle_tool";
import Line_Tool from "../canvas_engine/tools/line_tool";

export const Toolbox = ({imageID, imageIDSetter}) => {

    const [hex, updateHex] = useState("");
    const [xSize, updateXSize] = useState(16);
    const [ySize, updateYSize] = useState(16);

    const submitHex = (e) => {
        e.preventDefault();
        changeHex(hex);
    }

    const submitImageSize = (e) => {
        e.preventDefault();
        changeImageSizeValue(xSize, ySize);
    }

    // When the user clicks this button, it clicks the hidden import tag, which opens a file selection menu.
    // When a file is selected, the import tag's "change" event listener is fired.
    const tryImport = (e) => {
        e.preventDefault();
        document.getElementById("import_file").click();
    }

    const toggle = (element, func) => {
        element.classList.toggle("toolbox_selected");
        func();
    }

    const oneOffClick = (element, func) => {
        toggle(element, func);
        setTimeout(() => {
            element.classList.toggle("toolbox_selected");
        }, 100);
    }

    const trySaveDatabase = async () => {
        try{
            let response = {};
            if(imageID == null) response = await saveImage(getDataURL(), true, "image");
            else response = await updateImage({ id: imageID, img: getDataURL(), public: true, title: "image" });

            if(response.imageID !== null) {
                imageIDSetter(response.imgId);
                console.log("Saved!"); // Maybe replace with a confirmation message popup?
            }
            else{
                throw new Error(response);
            }
        }
        catch(err){
            console.err(err); // Maybe add an error message popup?
        }
    }

    return (
        <div id="tool_box">
            <h2>Toolbox</h2>
            <input type="file" id="import_file" accept="image/*" hidden/>
            <div id="toggles">
                <button id="grid_button" onClick={(e) => toggle(e.target, toggleGrid)}>Grid</button>
                <button id="overwrite_button" onClick={(e) => toggle(e.target, toggleOverwriteColours)}>Overwrite</button>
            </div>
            <div id="one-off">
                <button id="save_button" onClick={(e) => oneOffClick(e.target, trySaveDatabase)}>Save</button>
                <a href="/profile"><button id="load_button">Save as</button></a>
                <a href="/profile"><button id="load_button">Load</button></a>
                <button id="import_button" onClick={(e) => oneOffClick(e.target, tryImport)}>Import</button>
                <button id="export_button" onClick={(e) => oneOffClick(e.target, exportImage)}>Export</button>
                <button id="copy_button" onClick={(e) => oneOffClick(e.target, copy)}>Copy</button>
                <button id="cut_button" onClick={(e) => oneOffClick(e.target, cut)}>Cut</button>
                <button id="paste_button" onClick={(e) => oneOffClick(e.target, paste)}>Paste</button>
                <button id="undo_button" onClick={(e) => oneOffClick(e.target, commenceUndo)}>Undo</button>
                <button id="redo_button" onClick={(e) => oneOffClick(e.target, commenceRedo)}>Redo</button>
            </div>
            <div id="tools">
                <button id="tool_pencil" onClick={() => setTool(new Pencil())}>Pencil</button>
                <button id="tool_eraser" onClick={() => setTool(new Eraser())}>Eraser</button>
                <button id="tool_colour_picker" onClick={() => setTool(new Colour_Picker())}>Picker</button>
                <button id="tool_selection" onClick={() => setTool(new Selection_Tool(changeSelection))}>Select</button>
                <button id="tool_move" onClick={startMove}>Move</button>
                <button id="tool_fill" onClick={() => setTool(new Flood_Fill())}>Fill</button>
                <button id="tool_line" onClick={() => setTool(new Line_Tool())}>Line</button>
                <button id="tool_square" onClick={() => setTool(new Square_Tool())}>Square</button>
                <button id="tool_circle" onClick={() => setTool(new Circle_Tool())}>Circle</button>
            </div>
            <div id="colour_picker">
                <div id="selectPrimarySecondary">
                    <div id="selectPrimarySecondary_select">
                        <canvas id="primaryColourBox" onClick={() => {updateModifyingColour(true)}} width="1" height="1"></canvas>
                        <canvas id="secondaryColourBox" onClick={() => {updateModifyingColour(false)}} width="1" height="1"></canvas>
                        <button id="swapColourBox" onClick={swapColours}></button>
                    </div>
                    <div id="selectPrimarySecondary_text">
                        <p>Modifying Primary</p>
                    </div>
                </div>
                <div className="toolboxSettingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_red" width="256" height="1"></canvas>
                        <input id="slider_red" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(0, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_red" min="0" max="255" onChange={(e) => {changeSlider(0, e.target.value)}}></input>
                </div>
                <div className="toolboxSettingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_green" width="256" height="1"></canvas>
                        <input id="slider_green" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(1, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_green" min="0" max="255"onChange={(e) => {changeSlider(1, e.target.value)}}></input>
                </div>
                <div className="toolboxSettingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_blue" width="256" height="1"></canvas>
                        <input id="slider_blue" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(2, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_blue" min="0" max="255" onChange={(e) => {changeSlider(2, e.target.value)}}></input>
                </div>
                <div className="toolboxSettingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_alpha" width="256" height="1"></canvas>
                        <input id="slider_alpha" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(3, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_alpha" min="0" max="255" onChange={(e) => {changeSlider(3, e.target.value)}}></input>
                </div>
                <form id="hex_input_form" onSubmit={submitHex}>
                    <input id="hex_input" className="keypress_input" onChange={(e) => updateHex(e.target.value)}/>
                </form>
            </div>
            <p>Resize</p>
            <div id="image_resizer">
                <form onSubmit={submitImageSize} className="resizeSettingsContainer">
                    <div><p>X</p></div>
                    <input type="number" className="keypress_input" id="resize_x" min="1" max="1024" onChange={(e) => {updateXSize(e.target.value)}}></input>
                </form>
                <form onSubmit={submitImageSize} className="resizeSettingsContainer">
                    <div><p>Y</p></div>
                    <input type="number" className="keypress_input" id="resize_y" min="1" max="1024" onChange={(e) => {updateYSize(e.target.value)}}></input>
                </form>
            </div>
        </div>
    );
};
  