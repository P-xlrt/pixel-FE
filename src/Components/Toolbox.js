export const Toolbox = () => {
    return (
        <div className="tool_box">
            {/*  Import functionality */}
            <button id="import_button">Import</button>

            {/*  Export functionality  */}
            <input type="file" id="import_file" accept="image/*" hidden/>
            <button id="export_button">Export</button>

            <button id="undo_button">Undo</button>
            <button id="redo_button">Redo</button>
            <button id="grid_button">Grid</button>
        </div>
    );
};
  