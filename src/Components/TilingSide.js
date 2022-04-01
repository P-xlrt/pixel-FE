import { changeTiling } from "../canvas_engine/utils/canvas_client";

export const TilingSide = () => {
    const submit = (e) => {
        changeTiling(e);
    }

    return (		
        <div id="side_tiling" className="side_panel">
            <h2>Tiling</h2>
            <p>Orientation</p>
            <select name="Orientation" id="tiling_picker"  onChange={(e) => submit(e.target.value)}>
                <option value="Horizontal">Horizontal</option>
                <option value="Vertical">Vertical</option>
                <option value="Both">Both</option>
            </select>
        </div>
    );
}
