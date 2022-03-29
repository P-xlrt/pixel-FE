//@ts-check


// requires a token on the browser side
// should the arguments be an object?
export const saveImage = async (imgDataUrl, publicBool, title) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}image`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("myToken")}` },
            body: JSON.stringify({
                img: imgDataUrl,
                public: publicBool,
                title: title,
          }),
        });
        // do we need the following line? Yes we do.
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

// requires useStates to keep track of amount of items per page and page number
// returns an array that is grabbed with the setImages useState
// then you get images[] where each element is an image object with the following properties: "id", "title", "public" (a boolean), "img" (the dataURL as a string), "createdAt", "updatedAt", and the "UserId":7
// so get the image dataUrl with: images[0].img
// or for the id that should probably be used its key:
// images.rows[0].id
// time format for createdAt and updatedAt: "2022-03-24T23:50:44.000Z"
export const grabImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber, targetUser) => {

    let target = "all";
    if (targetUser) {
        target = targetUser;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}gallery/${target}/${itemsPerPage}/${pageNumber}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setImages(data.imagePack.rows);
        setTotalImgQty(data.imagePack.count)
    } catch (error) {
        console.log(error);
    }
};

// requires useStates to keep track of amount of items per page and page number
// requires a token on the browser side
// requires useStates to keep track of amount of items per page and page number
// returns an array that is grabbed with the setImages useState
// then you get images[] where each element is an image object with the following properties: "id", "title", "public" (a boolean), "img" (the dataURL as a string), "createdAt", "updatedAt", and the "UserId":7
// so get the image dataUrl with: images[0].img
// or for the id that should probably be used its key:
// images.rows[0].id
// time format for createdAt and updatedAt: "2022-03-24T23:50:44.000Z"
export const grabAllMyImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}mygallery/${itemsPerPage}/${pageNumber}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("myToken")}` },
        });
        const data = await response.json();
        setImages(data.imagePack.rows);
        setTotalImgQty(data.imagePack.count)
    } catch (error) {
        console.log(error);
    }
};

// requires a token on the browser side
// updateObj should provide {imgId, imgDataUrl, title, publicBool}
export const updateImage = async (updateObj) => {

    try {
        if (!updateObj.title) {
            delete updateObj.title;
        }

        const response = await fetch(`${process.env.REACT_APP_REST_API}image`, {
            method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("myToken")}` },
          body: JSON.stringify(updateObj),
    });
    return await response.json();
    } catch (error) {
        console.log(error);
    }
};

// requires a token on the browser side
export const deleteImage = async (imgId) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}image/${imgId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("myToken")}` },
    });
    const data = await response.json();
    } catch (error) {
        console.log(error);
    }
};
