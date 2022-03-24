import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Canvas } from "./Components/Canvas";
import { Footer } from "./Components/Footer";
import { Gallery } from "./Components/Gallery";
import { Landing } from "./Components/Landing";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";
import { Settings } from "./Components/Settings";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/create' element={<Canvas />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='*' element={<p>404 Not Found</p>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
