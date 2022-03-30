//@ts-check


import { deleteImage, getOneImg } from "../utils/imageRequests";
import { useState } from "react";
import "../styling/imgContainer.css";
import { useNavigate } from "react-router-dom";



// requires:
// currentImg, setCurrentImg from App.js
// img key from gallery
export const ImgContainer = (props) => {
  const [currentImg, setCurrentImg] = useState([]);

  let {title, id, img, createdAt, updatedAt, UserId} = props.imgObj;
  let navigate = useNavigate();

  // very roundabout way but it works
  const passToCanvas = (id, img) => {
    props.setCurrrentImgId(id); 
    props.setCurrentImg(img);
    navigate("/create");
  }

  const deleteAndRefresh = (id) => {
    deleteImage(id)
    props.setRefreshNeeded(!props.refreshNeeded);
  }


  return (
    <div className="ImgContainer">
        <h2>{title}</h2>
        <img src={img} className="imgInBox"></img>
        <label><button className='button' onClick={() => passToCanvas(id, img)}>&#128393;</button>edit</label>
        <label><button className='button' onClick={() => deleteAndRefresh(id)}>&#x1F5D1;</button>delete</label>
    </div>
  );
};
