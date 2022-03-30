//@ts-check



// on click on an image, make it full screen and show buttons if available
// on delete, reload images
// on click on edit open menu to update title and privacy of image or send it to the canvas with a redirect


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { grabImages } from "../utils/imageRequests";
import { useEffect, useState } from "react";

import { ImgContainer } from "./ImgContainer";
import { Navigate, useParams } from "react-router-dom";


export const Gallery = (props) => {
  const [images, setImages] = useState([]);
  const [totalImgQty, setTotalImgQty] = useState([]);
  const [pages, setPages] = useState([]);
  const [refreshNeeded, setRefreshNeeded] = useState(true);

  const { amountOfItems, page } = useParams();
  // this should be grabbed from/put in the url
  const [currentPage, setCurrentPage] = useState(page);
  // this should be grabbed from/put in the url
  const [itemsNeeded, setItemsNeeded] = useState(amountOfItems);


  const setImgNeededAndRefresh = (newValue) => {
    setItemsNeeded(newValue);
    setRefreshNeeded(!refreshNeeded);
  }


  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {

  useEffect(() => {
    if (!itemsNeeded) {
      setItemsNeeded(9);
    }
    if (!currentPage) {
      setCurrentPage(1);
    }
    grabImages(setImages, setTotalImgQty, itemsNeeded, currentPage, "all");
  }, [refreshNeeded]);





  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
      <label>Images per page: 
        <select id="imgPerPage" name="pages" value={itemsNeeded} onChange={(e) => setImgNeededAndRefresh(e.target.value)}>
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="60">60</option>
        </select></label>


        {images.map((imgObj) => {
          return (
            // <img src={imgObj.img}></img>
            <>
              {(itemsNeeded != amountOfItems) && <Navigate to={`/gallery/${itemsNeeded}/1`} />}
              {(!itemsNeeded) && <Navigate to={`/gallery/9/1`} />}
              <ImgContainer key={imgObj.id} imgObj={imgObj} setRefreshNeeded={setRefreshNeeded} refreshNeeded={refreshNeeded} setCurrentImg={props.imageURLSetter} setCurrrentImgId={props.imageIDSetter}/>
            </>
          );
        })}
    </div>
  );
};
