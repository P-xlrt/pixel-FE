//@ts-check


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { grabImages } from "../utils/imgRequests";
import { useEffect, useState } from "react";








export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [totalImgQty, setTotalImgQty] = useState([]);

  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {


  useEffect(() => {
    grabImages(setImages, setTotalImgQty, 20, 1, "all");
  }, []);
  


  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
      <div className="galleryImage">
        {images.map((imgObj, index) => {
          return (
            <div key={index}>
              <p>{imgObj.title}</p>
              <img src={imgObj.img} alt="hey"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
