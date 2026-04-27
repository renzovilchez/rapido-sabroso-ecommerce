import HomeInfo from "../components/Home/HomeInfo";
import CategoriaTiposCarousel from "../components/Home/CategoriaTiposCarousel";
import LoopHamburguesa from "../assets/videos/LoopHamburguesa.mp4";

function Home() {
  return (
    <div className="max-w-7xl m-auto mt-8 mb-8">
      <div className="relative w-full h-[500px] mb-12 overflow-hidden rounded">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={LoopHamburguesa}
          autoPlay
          muted
          loop
        />
        <div className="flex justify-center align-center h-full">
          <HomeInfo />
        </div>
      </div>

      <CategoriaTiposCarousel />
    </div>
  );
}

export default Home;
