import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import logoImage from "../../assets/images/logo.png";
import {
  ShoppingCart,
  User,
  LogOut,
  AlignJustify,
  X,
  ChevronDown,
  Home,
  Info,
  UtensilsCrossed,
  BookOpen,
  Video,
  Phone,
  History,
  Flame,
  Coffee,
  Sandwich,
  ClipboardList,
  Sparkles,
  Beef,
  Leaf,
  Crown,
  GlassWater,
  Citrus,
  Droplets,
  Wine,
} from "lucide-react";

function normalizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [combos, setCombos] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartItemCount, isLoggedIn, setIsLoggedIn } =
    useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch combos
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/combos")
      .then((res) => setCombos(res.data))
      .catch((err) => console.error("Error al cargar combos:", err));
  }, []);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  useEffect(() => {
    setNavOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleNav = () => setNavOpen(!navOpen);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
  };

  // Unique combo categories
  const uniqueComboCategories = [
    ...new Set(combos.map((c) => c.productType).filter(Boolean)),
  ];

  // Unique product categories
  const uniqueProductCategories = [
    ...new Set(
      products.map((product) => product.productType).filter(Boolean),
    ),
  ];

  // Get icon for combo category
  const getComboIcon = (category) => {
    const name = category.toLowerCase();
    if (name.includes("personal")) return Sparkles;
    if (name.includes("familiar")) return UtensilsCrossed;
    if (name.includes("duo") || name.includes("pareja")) return Sandwich;
    if (name.includes("ejecutivo")) return ClipboardList;
    return Sparkles;
  };

  // Get icon for product category
  const getProductIcon = (category) => {
    const name = category.toLowerCase();
    // Hamburguesas
    if (name.includes("clasica")) return Beef;
    if (name.includes("especial")) return Flame;
    if (name.includes("vegana")) return Leaf;
    if (name.includes("gourmet")) return Crown;
    // Bebidas
    if (name.includes("refresco")) return GlassWater;
    if (name.includes("jugo") || name.includes("natural")) return Citrus;
    if (name.includes("agua")) return Droplets;
    if (name.includes("tradicional")) return Wine;
    // Default
    if (name.includes("hamburguesa")) return Flame;
    if (name.includes("bebida")) return Coffee;
    return UtensilsCrossed;
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white py-3"
      }`}
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0 group">
            <img
              src={logoImage}
              alt="Rápido y Sabroso"
              className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Inicio */}
            <Link
              to="/home"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/home")
                  ? "bg-amber-900 text-white"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-900"
              }`}
            >
              <Home className="w-4 h-4" />
              Inicio
            </Link>

            {/* CARTA - Dropdown */}
            <div
              className="relative pt-2 -mt-2"
              onMouseEnter={() => setActiveDropdown("carta")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/carta"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive("/carta")
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                Carta
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    activeDropdown === "carta" ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {activeDropdown === "carta" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Ver toda la carta */}
                  <Link
                    to="/carta"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    Ver toda la carta
                  </Link>

                  <div className="h-px bg-gray-100" />

                      {/* COMBOS - Todas las categorías de combos */}
                      {uniqueComboCategories.length > 0 && (
                        <div className="py-2">
                          <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Combos
                          </p>
                          {uniqueComboCategories.map((category) => {
                            const Icon = getComboIcon(category);
                            return (
                              <Link
                                key={category}
                                to={`/carta/combo/${normalizeString(category)}`}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-amber-600" />
                                <span className="capitalize">
                                  {category.replace("_", " ")}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}

                      <div className="h-px bg-gray-100" />

                      {/* ÁRMALO - Todas las categorías de productos */}
                      {uniqueProductCategories.length > 0 && (
                        <div className="py-2">
                          <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Ármalo
                          </p>
                          {uniqueProductCategories.map((category) => {
                            const Icon = getProductIcon(category);
                            return (
                              <Link
                                key={category}
                                to={`/carta/${normalizeString(category)}`}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-amber-600" />
                                <span className="capitalize">
                                  {category.replace("_", " ")}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                </div>
              )}
            </div>

            {/* Links simples */}
            {[
              { to: "/blog", icon: BookOpen, label: "Blog" },
              { to: "/vlog", icon: Video, label: "Vlog" },
              { to: "/contacto", icon: Phone, label: "Contáctanos" },
              { to: "/nosotros", icon: Info, label: "Nosotros" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.to)
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Carrito */}
            <Link
              to="/carrito"
              className="relative p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-all group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Historial */}
            <Link
              to="/historial-pedidos"
              className="hidden sm:flex p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-all"
              title="Historial de pedidos"
            >
              <History className="w-5 h-5" />
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-red-100 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Salir</span>
              </button>
            ) : (
              <Link to="/login">
                <button className="hidden sm:flex items-center gap-1.5 bg-amber-500 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-amber-600 transition-all">
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Entrar</span>
                </button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-amber-50"
              onClick={toggleNav}
            >
              {navOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <AlignJustify className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {navOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Inicio */}
            <Link
              to="/home"
              onClick={() => setNavOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive("/home")
                  ? "bg-amber-900 text-white"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <Home className="w-5 h-5" />
              Inicio
            </Link>

            {/* Carta */}
            <div className="space-y-1">
              <Link
                to="/carta"
                onClick={() => setNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive("/carta")
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                <UtensilsCrossed className="w-5 h-5" />
                Ver toda la carta
              </Link>

              {/* Combos */}
              {uniqueComboCategories.length > 0 && (
                <div className="ml-4">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Combos
                  </p>
                  {uniqueComboCategories.map((category) => {
                    const Icon = getComboIcon(category);
                    return (
                      <Link
                        key={category}
                        to={`/carta/combo/${normalizeString(category)}`}
                        onClick={() => setNavOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <Icon className="w-4 h-4 text-amber-600" />
                        {category.replace("_", " ")}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Ármalo */}
              {uniqueProductCategories.length > 0 && (
                <div className="ml-4">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Ármalo
                  </p>
                  {uniqueProductCategories.map((category) => {
                    const Icon = getProductIcon(category);
                    return (
                      <Link
                        key={category}
                        to={`/carta/${normalizeString(category)}`}
                        onClick={() => setNavOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <Icon className="w-4 h-4 text-amber-600" />
                        {category.replace("_", " ")}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Links simples */}
            {[
              { to: "/blog", icon: BookOpen, label: "Blog" },
              { to: "/vlog", icon: Video, label: "Vlog" },
              { to: "/contacto", icon: Phone, label: "Contáctanos" },
              { to: "/nosotros", icon: Info, label: "Nosotros" },
              { to: "/historial-pedidos", icon: History, label: "Mis Pedidos" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive(item.to)
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}

            {/* Auth Mobile */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setNavOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              ) : (
                <Link to="/login" onClick={() => setNavOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white text-sm font-semibold px-4 py-3 rounded-xl">
                    <User className="w-4 h-4" />
                    Iniciar sesión
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
