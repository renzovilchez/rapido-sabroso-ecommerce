import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
// import musicaCriolla from "../../assets/audio/Navidad Criolla.mp3";
import "./LayoutNavideno.css";

const LayoutNavideno = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <audio id="background-music" src={musicaCriolla} autoPlay loop hidden /> */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-300 text-xl animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${12 + Math.random() * 20}px`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default LayoutNavideno;
