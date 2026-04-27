import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { Outlet } from "react-router-dom";
// import musicaCriolla from "../assets/audio/Del Norte Vengo.mp3";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <audio id="background-music" src={musicaCriolla} autoPlay loop hidden /> */}
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
