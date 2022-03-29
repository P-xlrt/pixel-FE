//@ts-check


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import {  } from "../utils/imageRequests";
import { useEffect, useState } from "react";


// {/* <Route path='/gallery' element={<Gallery imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID}/>} />   */}
// {/* export const Gallery = ({imageURLSetter, imageIDSetter}) => { */}



// requires:
// currentImg, setCurrentImg from App.js
// img key from gallery
export const ImgContainer = (props) => {
  const [currentImg, setCurrentImg] = useState([]);

  // {"id":7,"title":"Such Wonder","public":true,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3QuREAMBACMei/aH9NXGCREO6Mus7a5lwmvsltz8RflwABAgQIECBAgAABAgQIEPheYAMDciArUlVDXQAAAABJRU5ErkJggg==","createdAt":"2022-03-28T22:10:32.000Z","updatedAt":"2022-03-28T22:10:32.000Z","UserId":"damien"}

  useEffect(() => {
    grabImages(setImages, setTotalImgQty, 20, 1, "all");
  }, []);
  
  // var myCanvas = document.getElementById('my_canvas_id');
  // var ctx = myCanvas.getContext('2d');
  // var img = new Image;
  // img.onload = function(){
  //   ctx.drawImage(img,0,0); // Or at whatever offset you like
  // };
  // img.src = strDataURI;
  


  return (
    <div className="ImgContainer">
        {images.map((imgObj, index) => {
          return (
            <div key={index}>
              <p>{imgObj.title}</p>
              <img src={imgObj.img} alt="hey"/>
              <canvas id="${}"></canvas>
            </div>
          );
        })}
    </div>
  );
};
