//@ts-check


// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";
import { grabImages } from "../utils/imgRequests";
import { useEffect, useState } from "react";

// we need an api request to look up a name and return their id and avatar

// https://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas

// https://reactrouter.com/docs/en/v6/getting-started/tutorial#listing-the-invoices
// https://reactrouter.com/docs/en/v6/getting-started/concepts#outlets

// on-click of creator's name use setAuthor and redirect

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImgQty, setTotalImgQty] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [author, setAuthor] = useState("all");

  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {


  useEffect(() => {
    grabImages(setImages, setTotalImgQty, itemsPerPage, currentPage, author);
  }, []);

  let pageQty = Math.floor(totalImgQty / itemsPerPage);
  


  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
      <div className="galleryImage">
        {images.map((imgObj, index) => {
          return (
            <div key={index}>
              <p>{imgObj.title}</p>
              <img src={imgObj.img} alt="a beautiful creation"/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
