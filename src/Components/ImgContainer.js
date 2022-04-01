import { deleteImage, getOneImg, updateImage } from "../utils/imageRequests";
import { useEffect, useState } from "react";
import "../styling/imgContainer.css";
import { Link, useNavigate } from "react-router-dom";



// requires:
// currentImg, setCurrentImg from App.js
// img key from gallery
export const ImgContainer = (props) => {
  const [currentImg, setCurrentImg] = useState([]);

  //console.log(props.imgObj);
  let {title, id, img, createdAt, updatedAt, UserId, User} = props.imgObj;
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
    deleteImage(id);
    props.setRefreshNeeded(!props.refreshNeeded);
  }

  const saveAs = async (imageID) => {
    try{
      const response = await updateImage({ id: imageID, img: props.currentCanvasImage, public: true, title: props.currentCanvasName || "image" });
      alert("Save successful.");
    }
    catch(error){
      console.log(error);
    }
  }

  const handleCheckboxChange = async (e) => {
    const response = await updateImage({ id, img, public: e.target.checked, title: "image"});
    alert("Image was made " + (e.target.checked ? "public." : "private."));
  }


  const userNamo = User ? User.username : "[Unknown user]";
  const userLinko = User ? User.username : "all" ;

  
  return (
    <div className="ImgContainer">


        <h2>{'"' + title + '"'}{!props.public ? null : ` by `}<Link to={`/user/${userLinko}/9/1`} >{userNamo}</Link></h2>
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



