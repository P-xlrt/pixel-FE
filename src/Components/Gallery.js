//@ts-check



// on click on an image, make it full screen and show buttons if available
// on delete, reload images
// on click on edit open menu to update title and privacy of image or send it to the canvas with a redirect


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { grabImages } from "../utils/imageRequests";
import { useEffect, useState } from "react";

import { ImgContainer } from "./ImgContainer";


export const Gallery = (props) => {
  const [images, setImages] = useState([]);
  const [totalImgQty, setTotalImgQty] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshNeeded, setRefreshNeeded] = useState(true);
  const [itemsNeeded, setItemsNeeded] = useState(9);


  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {

  useEffect(() => {
    grabImages(setImages, setTotalImgQty, itemsNeeded, currentPage, "all");
    setRefreshNeeded(false);
  }, [refreshNeeded]);

  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
        {images.map((imgObj) => {
          return (
            // <img src={imgObj.img}></img>
            <ImgContainer key={imgObj.id} imgObj={imgObj} setRefreshNeeded={setRefreshNeeded} setCurrentImg={props.imageURLSetter} setCurrrentImgId={props.imageIDSetter}/>
          );
        })}
         <label>Images per page
        <select id="cars" name="cars">
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="18" selected>18</option>
          <option value="60">60</option>
        </select></label>
    </div>
  );
};
