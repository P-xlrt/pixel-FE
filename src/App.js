import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { tokenLogin } from "./utils";
import { useState, useEffect } from "react";
import { Navbar } from "./Components/Navbar";
import { Canvas } from "./Components/Canvas";
import { Footer } from "./Components/Footer";
import { Gallery } from "./Components/Gallery";
import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";
import { Settings } from "./Components/Settings";
import { Team } from "./Components/Team";
import { UserGallery } from "./Components/UserGallery";
import { Logout } from  "./Components/Logout";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // library.add(fab, faCheckSquare, faCoffee);
  // const [isShowLogin, setIsShowLogin] = useState(true);
  const [user, setUser] = useState();
  const [userImage, setUserImage] = useState("");

  const [canvasImageURL, setCanvasImageURL] = useState(null);
  const [canvasImageID, setCanvasImageID] = useState(null);
  const [isImagePublic, setPublicImage] = useState(false);
  const [canvasImageName, setCanvasImageName] = useState("image");

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenLogin(setUser, setUserImage);
    }
  }, [user]);

  return (
    <div className='app'>
      {/* <FontAwesomeIcon icon={faGear} /> */}
      <BrowserRouter>
        <Navbar  user={user}  />

        <Routes>
          <Route
            path='/login'
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path='/settings' element={<Settings user={user}/>} />
          <Route path='/gallery' element={ <Gallery public={true} currentCanvasImage={canvasImageURL} imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} /> } />
          <Route path='/gallery/:amountOfItems/:page' element={ <Gallery public={true} currentCanvasImage={canvasImageURL} imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} /> } />
          <Route path='/user/:user/:amountOfItems/:page' element={ <UserGallery public={true} currentCanvasImage={canvasImageURL} imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} /> } />
          <Route path='/create' element={
              <Canvas
                imageURL={canvasImageURL}
                imageURLSetter={setCanvasImageURL}
                imageID={canvasImageID}
                imageIDSetter={setCanvasImageID}
                imageName={canvasImageName}
                imageNameSetter={setCanvasImageName}
                isImagePublic={isImagePublic}
              />
            }
          />
          <Route path='/profile' element={<Profile public={false} user={user} userImage={userImage} currentCanvasImage={canvasImageURL} imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} imageNameSetter={setCanvasImageName}/>} />
          <Route path='/profile/:amountOfItems/:page' element={<Profile public={false} user={user} userImage={userImage} publicImageToggle={setPublicImage} currentCanvasImage={canvasImageURL} imageURLSetter={setCanvasImageURL} imageIDSetter={setCanvasImageID} imageNameSetter={setCanvasImageName}/>} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/team' element={<Team />} />
          <Route path='/logout' element={ <Logout user={user} setUser={setUser} /> } />
          <Route path='*' element={<Navigate to="/gallery"/>} />
        </Routes>

        <Footer />
        {/* <FontAwesomeIcon icon='check-square' />
        Your <FontAwesomeIcon icon='coffee' /> is hot and ready! */}
      </BrowserRouter>
    </div>
  );
};

export default App;
