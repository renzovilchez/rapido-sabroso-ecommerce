import { useEffect, useRef } from "react";
import CategoriaTypesCarousel from "../components/Home/CategoriesTypesCarousel";
import LoopHamburguesa from "../assets/videos/LoopHamburguesa.mp4";
import {
  Flame,
  Clock,
  MapPin,
  Truck,
  Star,
  ChevronDown,
  UtensilsCrossed,
} from "lucide-react";

function Home() {
  const videoRef = useRef(null);
  const contenidoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const scrollToContent = () => {
    if (contenidoRef.current) {
      const navbarHeight = 96;
      const elementPosition = contenidoRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-amber-50/30">
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[500px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={LoopHamburguesa}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium">
              <Flame className="w-4 h-4" />
              Desde 2021 en Trujillo
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Hamburguesas que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                enamoran
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Carne jugosa, pan artesanal y los mejores ingredientes. Hechas con
              el mismo cariño de cuando repartíamos en moto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/menu"
                className="group relative px-8 py-4 bg-amber-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" />
                  Ver la Carta
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Truck className="w-5 h-5" />
                Pedir Delivery
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Abierto ahora
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Delivery en Trujillo
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                4.9 / 5
              </span>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div
        ref={contenidoRef}
        id="contenido"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20"
      >
        {/* Separador decorativo*/}
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
          <Flame className="w-5 h-5 text-amber-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
        </div>

        {/* Carousel de categorías */}
        <section>
          <CategoriaTypesCarousel />
        </section>
      </div>
    </div>
  );
}

export default Home;
