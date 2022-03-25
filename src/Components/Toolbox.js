export const Toolbox = () => {
    return (
        <div id="tool_box">


            <button id="undo_button">Undo</button>
            <button id="redo_button">Redo</button>
            <button id="grid_button">Grid</button>

            {/*  Import functionality */}
            <button id="import_button">Import</button>

            {/*  Export functionality  */}
            <input type="file" id="import_file" accept="image/*" hidden/>
            <button id="export_button">Export</button>

            <button id="tool_pencil">Pencil</button>
            <button id="tool_eraser">Eraser</button>
            <button id="tool_colour_picker">Picker</button>
        </div>
    );
};
  