import NavbarLanding from "../../components/LandingPage/NavbarLanding";
import FooterLanding from "../../components/LandingPage/FooterLanding";
import SectionTag from "../../components/LandingPage/SectionTag";
import SectionTitle from "../../components/LandingPage/SectionTitle";
import Button from "../../components/LandingPage/Button";
import BenefitCard from "../../components/LandingPage/BenefitCard";
import MenuCard from "../../components/LandingPage/MenuCard";
import "./LandingPage.css";
import { Typewriter } from "react-simple-typewriter";
import hamburguesaLanding from "../../assets/images/hamburguesaLanding.png";
import { Timer, Leaf, Gift, Flame, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const TYPOGRAPHY = "font-['Playfair_Display']";

export default function LandingPage() {
  const typewriterWords = [
    "Pedidos al instante",
    "Ingredientes frescos",
    "Gana con cada orden",
  ];

  const benefits = [
    {
      icon: Timer,
      title: "Entrega Rápida",
      text: "Tu pedido estará listo en minutos. Rápido, caliente y sin complicaciones.",
    },
    {
      icon: Leaf,
      title: "Ingredientes Frescos",
      text: "Solo los mejores ingredientes seleccionados cada día para tu disfrute.",
    },
    {
      icon: Gift,
      title: "Sistema de Puntos",
      text: "Gana puntos con cada compra y canjéalos por descuentos especiales.",
    },
  ];

  const menuItems = [
    { name: "Clásica", image: "Clasica" },
    { name: "BBQ", image: "BBQ" },
    { name: "Tofu", image: "Tofu" },
    { name: "Doble Queso", image: "Tofu" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] antialiased">
      <NavbarLanding />

      <section className="hero-section relative flex-grow">
        <div className="burbujas">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="burbuja" />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 md:py-16 lg:py-0 min-h-[auto] md:min-h-[calc(100vh-5.5rem)] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Columna texto */}
            <div className="flex flex-col items-start text-center lg:text-left order-2 lg:order-1 w-full">
              <SectionTag>🔥 Pedidos al instante</SectionTag>

              {/* Typewriter con altura fija */}
              <div className="min-h-[3.3em] sm:min-h-[2.7em] md:min-h-[2.4em] lg:min-h-[2.2em] w-full flex items-center justify-center lg:justify-start mb-4">
                <h1
                  className={`font-bold leading-[1.15] ${TYPOGRAPHY} text-[clamp(1.75rem,5vw,3.5rem)] text-[#4B2E00] text-balance`}
                >
                  <span className="sr-only">
                    Tu hamburguesa favorita, ahora
                  </span>
                  <Typewriter
                    words={typewriterWords}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={55}
                    deleteSpeed={28}
                    delaySpeed={1400}
                  />
                </h1>
              </div>

              <p className="mb-8 leading-relaxed text-base md:text-lg text-[#6B4C2A] max-w-md mx-auto lg:mx-0">
                Hamburguesas deliciosas con ingredientes frescos, bebidas
                refrescantes y un sistema de pedidos rápido y sencillo.
              </p>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mx-auto lg:mx-0">
                <Button to="/home" className="w-full sm:w-auto">
                  Hacer un pedido
                </Button>
                <Button
                  to="/menu"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Ver menú
                </Button>
              </div>

              {/* Stats - siempre visibles */}
              <div className="mt-10 lg:mt-12 flex items-center justify-center lg:justify-start gap-6 lg:gap-0 w-full">
                {[
                  { num: "15", unit: "min", desc: "Entrega promedio" },
                  { num: "30+", unit: "", desc: "Combos disponibles" },
                  { num: "4.8", unit: "★", desc: "Valoración clientes" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center lg:gap-8">
                    <div className="text-center lg:text-left min-w-[80px] lg:min-w-0">
                      <div className="text-2xl lg:text-[2rem] font-bold text-[#C0392B] font-['Playfair_Display'] leading-none">
                        {stat.num}
                        <span className="text-lg lg:text-xl">{stat.unit}</span>
                      </div>
                      <div className="text-[0.7rem] lg:text-xs text-[#6B4C2A]/70 uppercase tracking-wider mt-1">
                        {stat.desc}
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="hidden lg:block w-px h-10 bg-[#F0E4CC] mx-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Columna imagen con pills */}
            <div className="relative flex items-center justify-center order-1 lg:order-2">
              <span className="hero-pill hero-pill--top-left">
                <Timer size={14} strokeWidth={2.5} />
                Listo en minutos
              </span>

              <span className="hero-pill hero-pill--top-right">
                <Flame size={14} strokeWidth={2.5} />
                Recién hecha
              </span>

              <div className="hero-img-container">
                <img
                  src={hamburguesaLanding}
                  alt="Hamburguesa gourmet con ingredientes frescos"
                  className="hero-img-float"
                  loading="eager"
                />
              </div>

              <span className="hero-pill hero-pill--bottom-left">
                <Leaf size={14} strokeWidth={2.5} />
                Ingredientes frescos
              </span>

              <span className="hero-pill hero-pill--bottom-right">
                <Truck size={14} strokeWidth={2.5} />
                Entrega gratis
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[#FFFDF9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 text-[#D4860A]">
              Nuestras ventajas
            </span>
            <SectionTitle>¿Por qué elegirnos?</SectionTitle>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto [&>*:last-child]:sm:col-span-2 [&>*:last-child]:lg:col-span-1">
            {benefits.map((item, i) => (
              <BenefitCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[#FBF5EC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 text-[#D4860A]">
              Lo más pedido
            </span>
            <SectionTitle>Nuestras estrellas</SectionTitle>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12 max-w-6xl mx-auto">
            {menuItems.map((item, i) => (
              <MenuCard
                key={i}
                name={item.name}
                imageUrl={`http://localhost:5000/images/hamburguesa${item.image}.jpg`}
                to="/menu/productos/tipo/hamburguesas-clasicas"
              />
            ))}
          </div>

          <div className="text-center">
            <Button to="/menu" variant="cta" className="px-8 py-4 text-base">
              Ver todo el menú →
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-[#4B2E00] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Columna texto */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-[#F5A623]/80">
                Primer pedido
              </span>

              <h2
                className={`font-bold mb-5 ${TYPOGRAPHY} text-3xl sm:text-4xl lg:text-[2.75rem] text-[#F5A623] leading-tight`}
              >
                Regístrate y haz tu primer pedido
              </h2>

              <p className="mb-8 text-[#F0E4CC] text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                Únete a la familia Rápido y Sabroso hoy mismo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  to="/register"
                  variant="cta"
                  className="px-8 py-4 text-lg"
                >
                  Empezar ahora
                </Button>
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-[#F0E4CC] hover:text-[#F5A623] transition-colors duration-200"
                >
                  Ver el menú primero →
                </Link>
              </div>

              {/* Trust indicators - iconos en fila, texto centrado debajo */}
              <div className="mt-10 flex items-start gap-6 justify-center lg:justify-start">
                {[
                  { icon: Timer, label: "Entrega rápida" },
                  { icon: Leaf, label: "Ingredientes frescos" },
                  { icon: Gift, label: "Sistema de puntos" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F5A623]/15 text-[#F5A623]">
                      <item.icon size={20} strokeWidth={2} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#F0E4CC]/80 max-w-[80px] sm:max-w-none leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna imagen */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#F5A623]/10 rounded-full blur-3xl scale-75" />

              <div className="relative w-full max-w-[400px] lg:max-w-[480px]">
                <img
                  src={hamburguesaLanding}
                  alt="Hamburguesa gourmet con ingredientes frescos"
                  className="hero-img-float"
                  loading="lazy"
                />

                {/* Badge */}
                <div className="absolute -top-4 -right-4 md:top-4 md:-right-8 bg-[#C0392B] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce-slow">
                  ¡Pide ya!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterLanding />
    </div>
  );
}
