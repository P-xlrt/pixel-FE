
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

  const setAmountOfPages = () => {
    let pagesNeeded = totalImgQty / pages;
    setPages(pagesNeeded);
  }

  const setPageAndRefresh = (newValue) => {
    setCurrentPage(newValue);
    setRefreshNeeded(!refreshNeeded);
  }

   


  // export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {

  useEffect(() => {
    if (!itemsNeeded) {
      setItemsNeeded(9);
    };
    if (!currentPage) {
      setCurrentPage(1);
    };
    grabImages(setImages, setTotalImgQty, itemsNeeded, currentPage, "all"); //props.public ? "all" : USER ); // If props.public is false, get the images belonging to user. Otherwise, use "all".
    setAmountOfPages();
    console.log(props);
  }, [refreshNeeded]);

  let pagesArray = (pages) => {

    let theArray = [1];
    for (let i = 0; i > pages; i++) {
      theArray[i] = i + 1;
      console.log(theArray);
    }
    return theArray;
  }





  return (
    
    <div className="galleryContainer">
      
      {(itemsNeeded != amountOfItems) && <Navigate to={`/gallery/${itemsNeeded}/1`} />}
      {(currentPage != page) && <Navigate to={`/gallery/${itemsNeeded}/${currentPage}`} />}
      {(!itemsNeeded) && <Navigate to={`/gallery/9/1`} />}

      <h1>Gallery</h1>
      <label>Images per page: 
      <select id="amountSelector" name="amountSelector" value={itemsNeeded} onChange={(e) => setImgNeededAndRefresh(e.target.value)}>
          <option value="9" key="imgNeeds_9">9</option>
          <option value="12" key="imgNeeds_12">12</option>
          <option value="18" key="imgNeeds_18">18</option>
          <option value="60" key="imgNeeds_60">60</option>
        </select></label>

        <label>Page: 
        <select id="pageSelector" name="pages" value={itemsNeeded} onChange={(e) => setPageAndRefresh(e.target.value)}>
          <option value="1" key="page_9">1</option>
          <option value="2" key="page_91">2</option>
          <option value="3" key="jkks_18">3</option>
          <option value="4" key="imgkjk0">4</option>

          {/* {pagesArray(pages).map((aPage) => {
            return (
              <>
              <option value={aPage} key={`pageArray_${aPage}`}>{aPage}</option>
              </>
            )
          })
          } */}
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
