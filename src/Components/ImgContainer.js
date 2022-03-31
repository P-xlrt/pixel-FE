import { deleteImage, getOneImg, updateImage } from "../utils/imageRequests";
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
    if(props.publicImageToggle) props.publicImageToggle(props.imgObj["public"]);
    if(props.imageNameSetter) props.imageNameSetter(title);
    navigate("/create");
  }

  const deleteAndRefresh = (id) => {
    deleteImage(id)
    props.setRefreshNeeded(!props.refreshNeeded);
  }

  const saveAs = async (imageID) => {
    const response = await updateImage({ id: imageID, img: props.currentCanvasImage, public: true, title: "image" });
    console.log(response);
  }

  const handleCheckboxChange = async (e) => {
    const response = await updateImage({ id, img, public: e.target.checked, title: "image"});
    alert("Image was made " + (e.target.checked ? "public." : "private."));
  }

  return (
    <div className="ImgContainer">
        <h2>{title}</h2>
        <img src={img} className="imgInBox"></img>
        {!props.public ? (<>
          <input type="checkbox" className="publicCheckbox" name="Public" onChange={handleCheckboxChange} defaultChecked={props.imgObj["public"]}/>
          <label><button className='button' onClick={() => passToCanvas(id, img)}>&#128393;</button>Load</label>
          <label><button className='button' onClick={() => saveAs(id)}>&#x1F4BE;</button>Save</label>
          <label><button className='button' onClick={() => deleteAndRefresh(id)}>&#x1F5D1;</button>Delete</label>
        </>) : null}
    </div>
  );
};
