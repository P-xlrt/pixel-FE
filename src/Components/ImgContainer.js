//@ts-check


import { deleteImage, getOneImg } from "../utils/imageRequests";
import { useState } from "react";
import "../styling/imgContainer.css";



// {/* <Route path='/gallery' element={<Gallery imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID}/>} />   */}



// requires:
// currentImg, setCurrentImg from App.js
// img key from gallery
export const ImgContainer = (props) => {
  const [currentImg, setCurrentImg] = useState([]);

  let {title, id, img, createdAt, updatedAt, UserId} = props.imgObj;

  // very roundabout way but it works
  const passToCanvas = (id, img) => {
    props.setCurrrentImgId(id); 
    props.setCurrentImg(img);
  }

  const deleteAndRefresh = (id) => {
    deleteImage(id)
    props.setRefreshNeeded(true);
  }

  // {"id":7,"title":"Such Wonder","public":true,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAOklEQVRYR+3QuREAMBACMei/aH9NXGCREO6Mus7a5lwmvsltz8RflwABAgQIECBAgAABAgQIEPheYAMDciArUlVDXQAAAABJRU5ErkJggg==","createdAt":"2022-03-28T22:10:32.000Z","updatedAt":"2022-03-28T22:10:32.000Z","UserId":"damien"}



  return (
    <div className="ImgContainer">
        <h2>{title}</h2>
        <img src={img} className="imgInBox"></img>
        <label><button className='button' onClick={() => passToCanvas(id, img)}>&#128393;</button>edit</label>
        <label><button className='button' onClick={() => deleteAndRefresh(id)}>&#x1F5D1;</button>delete</label>
    </div>
  );
};
