import { Toolbox } from "./Toolbox";
import "../styling/canvas.css";
import { setupClient, canvasMouseDown, canvasWheel, windowMouseUp, windowMouseMove, windowKeyDown, windowKeyUp, loadImage } from "../canvas_engine/utils/canvas_client";
import { applyResize } from "../canvas_engine/utils/view";
import { getDataURL } from "../canvas_engine/utils/drawing";
import { useEffect, useState } from "react";
import { AnimationSide } from "./AnimationSide";
import { TilingSide } from "./TilingSide";

export const Canvas = ({imageURL, imageURLSetter, imageID, imageIDSetter, imageName, imageNameSetter, isImagePublic = false}) => {
	// When the canvas component is mounted
	useEffect(() => {

		setupClient(imageURL);
		// Set up canvas code and window event handlers for the canvas page
		window.addEventListener("mouseup", windowMouseUp);
		window.addEventListener("mousemove", windowMouseMove);
		window.addEventListener("keydown", windowKeyDown);
		window.addEventListener("keyup", windowKeyUp);
		window.addEventListener("resize", applyResize);
		window.addEventListener("wheel", canvasWheel, {passive: false}) // Non-passive is needed to stop whole window from zooming on Ctrl+MouseWheel
		
		document.getElementById("import_file").addEventListener("change", function() {
			loadImage(URL.createObjectURL(this.files[0]));
		});

		// When the component is unmounted
		return () => {
			// Stores the canvas image so it can be restored when the canvas page is reopened
			imageURLSetter(getDataURL()); 
			// Remove window event listeners
			window.removeEventListener("mouseup", windowMouseUp);
			window.removeEventListener("mousemove", windowMouseMove);
			window.removeEventListener("keydown", windowKeyDown);
			window.removeEventListener("keyup", windowKeyUp);
			window.removeEventListener("resize", applyResize);
			window.removeEventListener("wheel", canvasWheel, {passive: false})
		}
	}, []); 

	const [sidePanel, setSidePanel] = useState(0);

	return (
		<>
			<div id="canvas_page_body">
				<Toolbox sidePanel={sidePanel} sidePanelSetter={setSidePanel} imageID={imageID} imageIDSetter={imageIDSetter} isImagePublic={isImagePublic} imageName={imageName} imageNameSetter={imageNameSetter}/>
				<div id="canvas_container" onMouseDown={canvasMouseDown} onContextMenu={(e) => e.preventDefault()}>
					<canvas id="canvas_grid" width="800" height="800"></canvas>
					<canvas id="canvas_interaction" width="800" height="800"></canvas>
					<canvas id="canvas_preview" width="800" height="800"></canvas>
					{ sidePanel === 1 && <AnimationSide/> }
					{ sidePanel === 2 && <TilingSide/> }
				</div>
			</div>

		</>
	);
};