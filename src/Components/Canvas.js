import { Toolbox } from "./Toolbox";
import "../styling/canvas.css";
import { setupClient, canvasMouseDown, canvasWheel, windowMouseUp, windowMouseMove, windowKeyDown, windowKeyUp } from "../canvas_engine/utils/canvas_client";
import { applyResize } from "../canvas_engine/utils/view";
import { getDataURL } from "../canvas_engine/utils/drawing";
import { useEffect, useState } from "react";

export const Canvas = ({imageURL, imageURLSetter, imageID, imageIDSetter}) => {

	// When the canvas component is mounted
	useEffect(() => { 
		// Set up canvas code and window event handlers for the canvas page
		setupClient(imageURL);
		window.addEventListener("mouseup", windowMouseUp);
		window.addEventListener("mousemove", windowMouseMove);
		window.addEventListener("keydown", windowKeyDown);
		window.addEventListener("keyup", windowKeyUp);
		window.addEventListener("resize", applyResize);
		window.addEventListener("wheel", canvasWheel, {passive: false}) // Non-passive is needed to stop whole window from zooming on Ctrl+MouseWheel

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

	return (
		<div id="canvas_page_body">
			<Toolbox imageID={imageID} imageIDSetter={imageIDSetter}/>
			<div id="canvas_container" onMouseDown={canvasMouseDown} onContextMenu={(e) => e.preventDefault()}>
				<canvas id="canvas_grid" width="800" height="800"></canvas>
				<canvas id="canvas_interaction" width="800" height="800"></canvas>
				<canvas id="canvas_preview" width="800" height="800"></canvas>
			</div>
		</div>
	);
};