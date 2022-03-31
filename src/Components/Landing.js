// The first pages visitor see when the arriving
import { Gallery } from "./Gallery";
import "../styling/gallery.css";

export const Landing = () => {
  return (
    <div>
      <div className='landingContainer'>
        <h1>Welcome to P:xlrt</h1>
        <p>
          P:xlrt is creative platform for aficionados of pixel art. P:xlr allows
          professional and amateur digital artists to design, save and showcase
          their pixel art.
        </p>
      </div>
      <Gallery />
    </div>
  );
};
