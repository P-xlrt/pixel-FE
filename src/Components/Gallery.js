// Gallery - Comprising both public and private galleries. Grid of images displayed to users
import "../styling/gallery.css";

export const Gallery = () => {
  return (
    <div className="galleryContainer">
      <h1>Gallery</h1>
      <div className="galleryImage">
        {/* {galleryImages.map((img, index) => {
          return (
            <div key={index}>
              <img src={img.img.path} alt={img.img.name}/>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
