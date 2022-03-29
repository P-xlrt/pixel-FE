//@ts-check


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { getOneImg } from "../utils/imageRequests";
import { useState } from "react";


// {/* <Route path='/gallery' element={<Gallery imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID}/>} />   */}



// requires:
// currentImg, setCurrentImg from App.js
// img key from gallery
export const ImgContainer = (props) => {
  const [currentImg, setCurrentImg] = useState([]);

  // {"id":7,"title":"Such Wonder","public":true,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3QuREAMBACMei/aH9NXGCREO6Mus7a5lwmvsltz8RflwABAgQIECBAgAABAgQIEPheYAMDciArUlVDXQAAAABJRU5ErkJggg==","createdAt":"2022-03-28T22:10:32.000Z","updatedAt":"2022-03-28T22:10:32.000Z","UserId":"damien"}

  
  let localCanvas = document.getElementById('gallery_canvas');
  var ctx = localCanvas.getContext('2d');
  var renderedImg = new Image;
  renderedImg.onload = function(){
    ctx.drawImage(renderedImg,0,0); // Or at whatever offset you like
  };
  renderedImg.src = props.imgObj.img;
  


  return (
    <div className="ImgContainer">
        <h2>{props.imgObj.title}</h2>
        <canvas id="gallery_canvas"></canvas>
    </div>
  );
};
