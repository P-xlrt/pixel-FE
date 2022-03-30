import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { Canvas } from "./Components/Canvas";
import { Footer } from "./Components/Footer";
import { Gallery } from "./Components/Gallery";
import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";
import { Settings } from "./Components/Settings";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // library.add(fab, faCheckSquare, faCoffee);
  // const [isShowLogin, setIsShowLogin] = useState(true);
  const [user, setUser] = useState();

  const [canvasImageURL, setCanvasImageURL] = useState(null);
  const [canvasImageID, setCanvasImageID] = useState(null);

  return (
    <div className='app'>
      {/* <FontAwesomeIcon icon={faGear} /> */}
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path='/login'
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path='/settings' element={<Settings />} />
          <Route path='/gallery' element={ <Gallery imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} /> } />
          <Route path='/gallery/:amountOfItems/:page' element={ <Gallery imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} /> } />
          <Route
            path='/create'
            element={
              <Canvas
                imageURL={canvasImageURL}
                imageURLSetter={setCanvasImageURL}
                imageID={canvasImageID}
                imageIDSetter={setCanvasImageID}
              />
            }
          />
          <Route path='/profile' element={<Profile />} />
          <Route path='/landing' element={<Landing />} />
          {/* <Route path='*' element={<p>404 Not Found</p>} /> */}
        </Routes>

        <Footer />
        {/* <FontAwesomeIcon icon='check-square' />
        Your <FontAwesomeIcon icon='coffee' /> is hot and ready! */}
      </BrowserRouter>
    </div>
  );
};

export default App;
