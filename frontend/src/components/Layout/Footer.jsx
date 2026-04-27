import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Shield,
  FileText,
  ChefHat,
  ArrowUp,
  UtensilsCrossed,
  Star,
  ExternalLink,
} from "lucide-react";
import logoImage from "../../assets/images/logos/fondo-color.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { to: "/home", label: "Inicio" },
    { to: "/menu", label: "Nuestra Carta" },
    { to: "/nosotros", label: "Nuestra Historia" },
    { to: "/blog", label: "Blog" },
    { to: "/contacto", label: "Contáctanos" },
    { to: "/historial-pedidos", label: "Mis Pedidos" },
  ];

  const servicios = [
    { to: "/menu", label: "Hamburguesas a la Carta", icon: UtensilsCrossed },
    { to: "/menu", label: "Combos Especiales", icon: Star },
  ];

  const legalLinks = [
    { to: "/ayuda/preguntas-frecuentes", label: "Preguntas Frecuentes" },
    { to: "#", label: "Términos y Condiciones" },
    { to: "#", label: "Política de Privacidad" },
    { to: "#", label: "Política de Cookies" },
    { to: "#", label: "Libro de Reclamaciones" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/rapidosabrosotrujillo",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/rapidosabrosotrujillo",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@rapidosabrosotrujillo",
      label: "YouTube",
      color: "hover:bg-red-600",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column - Historia breve */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/home" className="inline-block">
              <div className="flex items-center gap-3">
                <img
                  src={logoImage}
                  alt="Rápido y Sabroso"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold text-amber-500">
                    Rápido y Sabroso
                  </h3>
                </div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Nacimos en{" "}
              <span className="text-amber-500 font-medium">2021</span> en una
              cocina de Trujillo, repartiendo en moto. En{" "}
              <span className="text-amber-500 font-medium">2023</span> abrimos
              nuestro primer local. Hoy seguimos con la misma esencia:{" "}
              <span className="text-white font-medium">
                calidad, sabor y ganas de crecer
              </span>
              .
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios - Solo 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-amber-500" />
              Lo que Ofrecemos
            </h4>
            <ul className="space-y-2.5">
              {servicios.map((servicio, idx) => (
                <li key={idx}>
                  <Link
                    to={servicio.to}
                    className="text-sm text-gray-400 hover:text-amber-500 hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <servicio.icon className="w-3.5 h-3.5 text-gray-600" />
                    {servicio.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa + Contacto */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Encuéntranos
            </h4>

            {/* Mapa embebido */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902!2d-79.035!3d-8.111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDYnMzkuNiJTIDc5wrAwMicwNi4wIlc!5e0!3m2!1ses!2spe!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Rápido y Sabroso"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Contacto compacto */}
            <div className="space-y-2 text-sm">
              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +51 987 654 321
              </a>
              <a
                href="mailto:hola@rapidosabroso.pe"
                className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                hola@rapidosabroso.pe
              </a>
              <p className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                Lun-Dom: 11:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              {legalLinks.map((link, idx) => (
                <span key={idx} className="flex items-center gap-4">
                  <Link
                    to={link.to}
                    className="hover:text-amber-500 transition-colors flex items-center gap-1"
                  >
                    {link.label.includes("Términos") && (
                      <FileText className="w-3 h-3" />
                    )}
                    {link.label.includes("Privacidad") && (
                      <Shield className="w-3 h-3" />
                    )}
                    {link.label}
                  </Link>
                  {idx < legalLinks.length - 1 && (
                    <span className="hidden sm:inline">|</span>
                  )}
                </span>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-lg shadow-amber-500/25"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>&copy; 2026 Rápido y Sabroso.</p>
            <a
              href="https://renzovilchez.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-500 transition-colors"
            >
              Hecho por Renzo Vilchez
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
