//@ts-check


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { grabImages } from "../utils/imageRequests";
import { useEffect, useState } from "react";

import { ImgContainer } from "./ImgContainer";


export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [totalImgQty, setTotalImgQty] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {


  useEffect(() => {
    grabImages(setImages, setTotalImgQty, 20, currentPage, "all");
  }, []);

  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
      <div className="galleryImage">
        {images.map((imgObj, index) => {
          return (
            <ImgContainer key={imgObj.id} imgObj={imgObj}/>
          );
        })}
      </div>
    </div>
  );
};
