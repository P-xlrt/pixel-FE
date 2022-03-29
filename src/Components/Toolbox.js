import { useState } from "react";
import { changeHex, changeSlider, setOverwriteColours, getOverwriteColours, getDataURL, swapColours, updateModifyingColour } from "../canvas_engine/utils/drawing";
import { commenceUndo, commenceRedo, exportImage, setTool, copy, paste, startMove, changeSelection, toggleGrid } from "../canvas_engine/utils/canvas_client";
import { saveImage, updateImage } from "../utils/imageRequests"; 
import Pencil from "../canvas_engine/tools/pencil";
import Eraser from "../canvas_engine/tools/eraser";
import Colour_Picker from "../canvas_engine/tools/colour_picker";
import Selection_Tool from "../canvas_engine/tools/selection_tool";

export const Toolbox = ({imageID, imageIDSetter}) => {

    const [hex, updateHex] = useState("");
    const changeHexInput = e => updateHex(e.target.value);

    const submitHex = (e) => {
        e.preventDefault();
        changeHex(hex);
    }

    // When the user clicks this button, it clicks the hidden import tag, which opens a file selection menu.
    // When a file is selected, the import tag's "change" event listener is fired.
    const tryLoad = function() { loadImage(URL.createObjectURL(this.files[0])); }
    const tryImport = (e) => {
        e.preventDefault();
        document.getElementById("import_file").click();
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
            <input type="file" id="import_file" accept="image/*" hidden onChange={tryLoad}/>
            <div id="toggles">
                <button id="grid_button" onClick={toggleGrid}>Grid</button>
                <button id="overwrite_button" onClick={() => setOverwriteColours(!getOverwriteColours())}>Overwrite</button>
            </div>
            <div id="one-off">
                <button id="save_button" onClick={trySaveDatabase}>Save</button>
                <button id="load_button"><a href="/gallery">Load</a></button>
                <button id="import_button" onClick={tryImport}>Import</button>
                <button id="export_button" onClick={exportImage}>Export</button>
                <button id="copy_button" onClick={copy}>Copy</button>
                <button id="paste_button" onClick={paste}>Paste</button>
                <button id="undo_button" onClick={commenceUndo}>Undo</button>
                <button id="redo_button" onClick={commenceRedo}>Redo</button>
            </div>
            <div id="tools">
                <button id="tool_pencil" onClick={() => setTool(new Pencil())}>Pencil</button>
                <button id="tool_eraser" onClick={() => setTool(new Eraser())}>Eraser</button>
                <button id="tool_colour_picker" onClick={() => setTool(new Colour_Picker())}>Picker</button>
                <button id="tool_selection" onClick={() => setTool(new Selection_Tool(changeSelection))}>Select</button>
                <button id="tool_move" onClick={startMove}>Move</button>
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
                <form id="hex_input_form" onSubmit={submitHex}><input id="hex_input" className="keypress_input" onChange={changeHexInput}/></form>
            </div>
        </div>
    );
};
  