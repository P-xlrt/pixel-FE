

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
        // do we need the following line?
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
};

// requires useStates to keep track of amount of items per page and page number
// returns an imagePack object that is grabbed with the setImages useState
// then you get images.count, used to calculate the number of pages the user can click on
// and images.rows[] where element is an image object with the following values: "id","title":"titled","public":true,"img":"this would be the dataURL for that image","createdAt":"2022-03-24T23:50:44.000Z","updatedAt":"2022-03-24T23:50:44.000Z","UserId":7
// to get the image dataUrl: images.rows[0].img 
// or for its id that should probably be its key:
// images.rows[0].id
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
        setImages(data.imagePack.rows);
        setTotalImgQty(data.imagePack.count)
    } catch (error) {
        console.log(error);
    }
};

// curl -X GET  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiaWF0IjoxNjQ4MjU2MTI2fQ.-Mw8HX3Yj-clm7yXLhTubAnmHkU0N9SjPieNUpyogPk" -H 'Content-Type: application/json' http://localhost:5000/mygallery/2/1
export const grabAllImages = async (setImages, setTotalImgQty, itemsPerPage, pageNumber) => {

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

