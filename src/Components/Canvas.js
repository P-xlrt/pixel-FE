import { Toolbox } from "./Toolbox";
import "../styling/canvas.css";
import setupClient from "../canvas_engine/utils/canvas_client";
import { useEffect } from "react";

export const Canvas = () => {

	// Sets up the canvas code when this component is loaded (page refresh or navigation)
	useEffect(() => { 
		setupClient();
	}, []); 

	return (
		<div id="canvas_page_body">
			<Toolbox/>
			<div id="canvas_container">
				<canvas id="canvas_grid" width="800" height="800"></canvas>
				<canvas id="canvas_interaction" width="800" height="800"></canvas>
				<canvas id="canvas_preview" width="800" height="800"></canvas>
			</div>
		</div>
	);
};