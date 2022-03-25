import { Toolbox } from "./Toolbox";

import History from "../canvas_engine/utils/history";
import View from "../canvas_engine/utils/view";
import Drawing from "../canvas_engine/utils/drawing";
import Pencil from "../canvas_engine/tools/pencil";

import "../styling/page_body.css";
import "../styling/canvas.css";

export const Canvas = () => {

  const canvas_container = document.getElementById("canvas_container");
  const canvas_drawing = document.getElementById("canvas_interaction");
  const drawingCtx = canvas_drawing.getContext("2d");
  const canvas_preview = document.getElementById("canvas_preview");
  const previewCtx = canvas_preview.getContext("2d");
  const canvas_grid = document.getElementById("canvas_grid");
  const gridCtx = canvas_grid.getContext("2d");

  // =========================================================== //
  //      CLIENT SIDE VARIABLES / FUNCTIONS
  // =========================================================== //

  // Image moving variables
  let panning = false;
  let cursorLocationX = 0;
  let cursorLocationY = 0;

  // Tools
  let tool = new Pencil();

  const createNewImage = (x = 16, y = 16) => {
      Drawing.newImage(x, y);
  }

  // =========================================================== //
  //      EVENT HANDLERS
  // =========================================================== //


  // Mouse wheel detection on the canvas & background container
  canvas_container.addEventListener("wheel", e => {
      e.preventDefault();
      if(e.ctrlKey){
          View.changeZoom(e.deltaY, e.clientX, e.clientY); // Zoom
      }
      else{
          View.offsetPosition(0, e.deltaY); // Scroll
      }
  });


  // Key press / unpress detection for the whole window
  let keyDebounce = null; // One key instruction at a time, only once until it's unpressed

  window.addEventListener("keydown", (e) => {
      if(!keyDebounce){
          if(e.ctrlKey){
              if(e.code == "KeyZ"){
                  keyDebounce = e.code;
                  History.undo();
              }
              else if(e.code == "KeyY"){
                  keyDebounce = e.code;
                  History.redo();
              }
          }
      }
  });

  window.addEventListener("keyup", (e) => {
      if(keyDebounce == e.code){
          keyDebounce = false;
      }
  });

  // Mouse move detection for the whole window (for canvas moving only)
  window.addEventListener("mousemove", (e) => {
      if(panning){
          // Apply offset to old position
          View.offsetPosition(cursorLocationX - e.clientX, cursorLocationY - e.clientY);

          // Update the "old" position
          cursorLocationX = e.clientX;
          cursorLocationY = e.clientY;    
      }
  });

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
          if(e.button == 0 || e.button == 2) tool.start(e.button, e.clientX, e.clientY);
      }
  }

  canvas_container.onmousemove = (e) => {
      if(!tool) return;
      tool.mouseMove(e.clientX, e.clientY);
  }


  // When the user clicks this button, it creates a temporary anchor tag that is provided the image data and download attributes.
  // It's automatically clicked, which starts the download functionality on the browser. Once it's done, the anchor is deleted.
  document.getElementById("export_button").addEventListener("click", () => { 
      let a = document.createElement("a");
      a.href = canvas_drawing.toDataURL();
      console.log(a.href.length, a.href);
      a.setAttribute("download", "export.png"); // export.png can be changed to image title name
      a.click();
      a.remove();
  });

  // When the user clicks this button, it clicks the hidden import tag, which opens a file selection menu.
  // When a file is selected, the import tag's "change" event listener is fired.
  document.getElementById("import_button").addEventListener("click", (e) => {
      e.preventDefault();
      import_file.click();
  });

  // When a file has been selected, grab the file that was selected and create a URL that represents it.
  // The setDataUrl function is fired with this URL which changes the canvas image.
  document.getElementById("import_file").addEventListener("change", function() {  
      setDataUrl(URL.createObjectURL(this.files[0]));
  });

  // The Image class can be used in a canvas' drawImage function, which pastes the image onto the canvas.
  // The event handler for loading the image has to be done before the image's source is modified.
  // When the image is loaded from the URL, a new canvas is created and the image is put on it.
  const setDataUrl = (dataURL) => {
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


  // Undo / Redo buttons
  document.getElementById("undo_button").addEventListener("click", History.undo);
  document.getElementById("redo_button").addEventListener("click", History.redo);

  // Toggle grid button
  //canvas_grid.style.visibility = "hidden"; // Hidden by default
  document.getElementById("grid_button").addEventListener("click", () =>{
      canvas_grid.style.visibility = canvas_grid.style.visibility == "hidden" ? "visible" : "hidden";
      View.redrawGrid();
  });

  // Reset canvas view when the window is resized
  window.onresize = () => {
      View.applyResize();
  }

  // Create a new image on page load
  createNewImage(16, 16);



  // window.onbeforeunload = () => {
  //     localStorage.setItem("img", getDataUrl());
  // }

  // setDataUrl(localStorage.getItem("img"));

  return (
    <div className="page_body">
      <Toolbox/>
      <div id="canvas_container">
        <canvas id="canvas_interaction" width="800" height="800"></canvas>
        <canvas id="canvas_preview" width="800" height="800"></canvas>
        <canvas id="canvas_grid" width="800" height="800"></canvas>
      </div>
    </div>
  );
};
