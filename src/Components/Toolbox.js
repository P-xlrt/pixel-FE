import { useState } from "react";
import { changeHex, changeSlider } from "../canvas_engine/utils/drawing";

export const Toolbox = () => {

    const [hex, updateHex] = useState("");

    const changeHexInput = (e) => {
        updateHex(e.target.value);
    }

    const submitHex = (e) => {
        e.preventDefault();
        changeHex(hex);
    }

    return (
        <div id="tool_box">
            <input type="file" id="import_file" accept="image/*" hidden/>
            <div id="toggles">
                <button id="grid_button">Grid</button>
                <button id="overwrite_button">Overwrite</button>
            </div>
            <div id="one-off">
                <button id="import_button">Import</button>
                <button id="export_button">Export</button>
                <button id="copy_button">Copy</button>
                <button id="paste_button">Paste</button>
                <button id="undo_button">Undo</button>
                <button id="redo_button">Redo</button>
            </div>
            <div id="tools">
                <button id="tool_pencil">Pencil</button>
                <button id="tool_eraser">Eraser</button>
                <button id="tool_colour_picker">Picker</button>
                <button id="tool_selection">Select</button>
                <button id="tool_move">Move</button>
            </div>

            <div id="colour_picker">
                <div id="selectPrimarySecondary">
                    <div id="selectPrimarySecondary_select">
                        <canvas id="primaryColourBox" width="1" height="1"></canvas>
                        <canvas id="secondaryColourBox" width="1" height="1"></canvas>
                        <button id="swapColourBox"></button>
                    </div>
                    <div id="selectPrimarySecondary_text">
                        <p>Modifying Primary</p>
                    </div>
                </div>
                <div className="settingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_red" width="256" height="1"></canvas>
                        <input id="slider_red" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(0, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_red" min="0" max="255"></input>
                </div>
                <div className="settingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_green" width="256" height="1"></canvas>
                        <input id="slider_green" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(1, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_green" min="0" max="255"></input>
                </div>
                <div className="settingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_blue" width="256" height="1"></canvas>
                        <input id="slider_blue" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(2, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_blue" min="0" max="255"></input>
                </div>
                <div className="settingsContainer">
                    <div className="sliderContainer">
                        <canvas id="background_alpha" width="256" height="1"></canvas>
                        <input id="slider_alpha" className="slider" type="range" min="0" max="255" onChange={(e) => {changeSlider(3, e.target.value)}}></input>
                    </div>
                    <input type="number" className="keypress_input" id="number_alpha" min="0" max="255"></input>
                </div>
                <form id="hex_input_form" onSubmit={submitHex}><input id="hex_input" className="keypress_input" onChange={changeHexInput}/></form>
            </div>
        </div>
    );
};
  