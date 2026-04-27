import NavbarLanding from "../../components/NavbarLanding";
import FooterLanding from "../../components/FooterLanding";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Typewriter } from "react-simple-typewriter";
import hamburguesaLanding from "../../assets/images/hamburguesaLanding.png";
import { Timer, Leaf, Gift } from "lucide-react";
// import musicaCriolla from "../../assets/audio/Del Norte Vengo.mp3";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <audio src={musicaCriolla} autoPlay loop hidden /> */}

      {/* Fondo animado con burbujas */}
      <div className="bg_animate flex-grow relative">
        <NavbarLanding />
        <div className="burbujas">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="burbuja"></div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative bg_animate flex-grow flex  justify-center text-center text-gray-800 overflow-hidden">
          <div className="z-10 p-8 flex flex-col items-center">
            <h1 className="text-5xl text-center font-bold text-red-600 mb-10">
              Bienvenido a "Rapido y sabroso"
            </h1>
            <h2 className="text-4xl text-center font-bold text-yellow-700">
              <Typewriter
                words={[
                  "¡Tu hamburguesa favorita en minutos!",
                  "Ordena fácil y rápido",
                  "¡Sabores irresistibles te esperan!",
                ]}
                loop={0} // 0 es infinito
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={1200}
              />
            </h2>
            <div className="relative z-10">
              <img
                src={hamburguesaLanding}
                alt="Hamburguesa"
                className="w-72"
              />
            </div>
            <p className="text-xl max-w-3xl text-gray-900 mb-4">
              Disfruta de hamburguesas deliciosas, bebidas refrescantes y un
              sistema de pedidos rápido y sencillo.
            </p>
            <Link
              to="/home"
              className="bg-black text-white px-8 py-4 rounded-full text-lg hover:bg-gray-800 transition"
            >
              Ir a la página
            </Link>
          </div>

          {/* Burbujas animadas */}
          <div className="burbujas">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="burbuja" />
            ))}
          </div>
        </section>
      </div>

      {/* Beneficios */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <Timer size={50} className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p>
              Tu pedido estará listo en minutos. ¡Rápido y sin complicaciones!
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <Leaf size={50} className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ingredientes Frescos</h3>
            <p>
              Usamos solo los mejores ingredientes para que disfrutes al máximo.
            </p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <Gift size={50} className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Sistema de Bonos de puntos
            </h3>
            <p>Gana puntos con cada compra y obtén descuentos especiales.</p>
          </div>
        </div>
      </section>

      {/* Menú destacado */}

      <section className="py-16 px-8 bg-yellow-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Nuestras Estrellas</h2>
        <Link to="/menu/productos/tipo/hamburguesas-clasicas">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Clasica", "BBQ", "Tofu", "Tofu"].map((name, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-4 h-full text-center cursor-pointer hover:shadow-2xl transform hover:scale-110 transition duration-300"
              >
                <img
                  src={`http://localhost:5000/images/hamburguesa${name}.jpg`}
                  alt={name}
                  className="w-full rounded-xl "
                />
              </div>
            ))}
          </div>
        </Link>
        <Link
          to="/menu"
          className="mt-8 inline-block bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition"
        >
          Ver todo el menú
        </Link>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-8 bg-yellow-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Registrate y haz tu primer pedido
        </h2>
        <p className="text-lg mb-6">
          Únete a la familia Rápido y Sabroso ahora.
        </p>
        <Link
          to="/register"
          className="bg-white text-yellow-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Empezar ahora
        </Link>
      </section>

      <FooterLanding />
    </div>
  );
};

export default LandingPage;
