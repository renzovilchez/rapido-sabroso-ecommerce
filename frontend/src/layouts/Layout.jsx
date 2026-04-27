// components/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
// import musicaCriolla from "../assets/audio/Del Norte Vengo.mp3";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <audio id="background-music" src={musicaCriolla} autoPlay loop hidden /> */}
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
