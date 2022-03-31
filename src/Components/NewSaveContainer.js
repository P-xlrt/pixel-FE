import { saveImage} from "../utils/imageRequests";
import "../styling/imgContainer.css";

export const NewSaveContainer = ({imageURL, imageName}) => {

    const newImage = async () => {
        try{
            if(!localStorage.getItem("myToken")) throw new Error("User not logged in.");

            const response = await saveImage(imageURL, false, imageName);
            if(response.imageID !== null) {
                alert("Save successful!"); // Maybe replace with a confirmation message popup?
            }
            else{
                throw new Error(response);
            }
        }
        catch(err){
            alert(err); // Maybe add an error message popup?
        }
    }

    return (
        <div className="ImgContainer" onClick={newImage}>
            <h2>New save</h2>
            <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4T+2TQQ7AIAgE2S/CO+GLWoj2ohhbr+7RmIEwWZQndBCsAAACvZqxBWBmUtXpnhdAFDfo1/5q0+0cAdzOa0FEhgXMLN78Y5arsWlMD9TK9LsLDu52sjJVIZRrwxR7ViYAAAAASUVORK5CYII="} className="imgInBox"></img>
        </div>
    );
};
