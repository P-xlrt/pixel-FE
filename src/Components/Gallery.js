
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

  // grabs params
  const { amountOfItems, page } = useParams();

  // this holds the object containing the images
  const [images, setImages] = useState([]);

  // amount of images in the database for that query 
  // set during the request
  const [totalImgQty, setTotalImgQty] = useState(0);

  // amount of available pages
  // requires totalImgQty
  const [pages, setPages] = useState(1);
  // should really be using the useEffect better
  const [refreshNeeded, setRefreshNeeded] = useState(true);

  // this should be grabbed from/put in the url
  const [currentPage, setCurrentPage] = useState(1);
  
  // this should be grabbed from/put in the url
  const [itemsNeeded, setItemsNeeded] = useState(parseInt(amountOfItems));



  // calculates how many pages are available
  const setAmountOfPages = () => {
    // console.log("entering setamountofpagees", totalImgQty);
    // console.log("entering setamountofpagees", itemsNeeded);
    if ((!totalImgQty) ||(parseInt(totalImgQty) < 1)) {
      setPages(1);
    } else {
      let pagesNeeded = Math.ceil(parseInt(totalImgQty) / parseInt(itemsNeeded));
      if (currentPage > pagesNeeded) {
        setCurrentPage(1);
      }
      // pages returns NaN at the moment
      // console.log("total img", totalImgQty, "pages", pages);
      // console.log("pages needed:", pagesNeeded);
      setPages(pagesNeeded);
    }
  }

  const pagesArray = (pages) => {
    // setAmountOfPages();    
    let theArray = [];
    //console.log("pages in pagesArray: ", pages);
    for (let i = 0; i < pages; i++) {
      theArray[i] = i + 1;
      //console.log(theArray);
    }
    return theArray;
  }


   


  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {

  useEffect(() => {
    if (!itemsNeeded) {
      setItemsNeeded(9);
    };
    if (!currentPage) {
      setCurrentPage(1);
    };
    grabImages(setImages, setTotalImgQty, itemsNeeded, currentPage, "all");
  }, [refreshNeeded, currentPage, itemsNeeded]);

  useEffect(() => {
    if (totalImgQty > 1) {
      setAmountOfPages();
    }
  }, [totalImgQty, itemsNeeded]);








  return (
    
    <div className="galleryContainer">
      {(!itemsNeeded) && <Navigate to={`/gallery/9/1`} />}
      {(itemsNeeded != parseInt(amountOfItems)) && <Navigate to={`/gallery/${itemsNeeded}/1`} />}
      {(currentPage != parseInt(page)) && <Navigate to={`/gallery/${itemsNeeded}/${currentPage}`} />}

      <h1>Gallery</h1>
      <label>Images per page: 
      <select id="amountSelector" name="amountSelector" value={itemsNeeded} onChange={(e) => setItemsNeeded(parseInt(e.target.value))}>
          <option value="9" key="imgNeeds_9">9</option>
          <option value="12" key="imgNeeds_12">12</option>
          <option value="18" key="imgNeeds_18">18</option>
          <option value="60" key="imgNeeds_60">60</option>
        </select></label>

        <label>Page: 
        <select id="pageSelector" name="pageSelect" value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value))}>
          {pagesArray(pages).map((aPage) => {

            return (
              <>
              <option value={aPage} key={`pageArray_${aPage}`}>{aPage}</option>
              </>
            )
          })}
        </select></label>


        {images.map((imgObj) => {
          return (
            <> {/* Public determines whether to show save/load/delete or not */}
              <ImgContainer currentCanvasImage={props.currentCanvasImage} public={props.public} key={`img_${imgObj.id}`} imgObj={imgObj} setRefreshNeeded={setRefreshNeeded} refreshNeeded={refreshNeeded} setCurrentImg={props.imageURLSetter} setCurrrentImgId={props.imageIDSetter}/>
            </>
          );
        })}
    </div>
  );
};
