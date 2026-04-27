import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import logoImage from "../../assets/images/logo.png";
import {
  ShoppingCart,
  User,
  LogOut,
  Menu as MenuIcon,
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
  Cookie,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menus, setMenus] = useState([]);
  const [productos, setProductos] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartItemCount, isLoggedIn, setIsLoggedIn } =
    useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar menús (combos)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menus")
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Error al cargar menús:", err));
  }, []);

  // Cargar productos (ármalo)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
  };

  // Tipos únicos de menú (combos)
  const tiposMenuUnicos = [
    ...new Set(menus.map((menu) => menu.tipo_menu).filter(Boolean)),
  ];

  // Tipos únicos de producto (ármalo)
  const tiposProductoUnicos = [
    ...new Set(
      productos.map((producto) => producto.tipoProducto).filter(Boolean),
    ),
  ];

  // Icono según tipo de COMBO/MENÚ
  const getComboIcon = (tipo) => {
    const name = tipo.toLowerCase();
    if (name.includes("personal")) return Sparkles;
    if (name.includes("familiar")) return UtensilsCrossed;
    if (name.includes("duo") || name.includes("pareja")) return Sandwich;
    if (name.includes("ejecutivo")) return ClipboardList;
    return Sparkles;
  };

  // Icono según tipo de PRODUCTO (ármalo)
  const getProductoIcon = (tipo) => {
    const name = tipo.toLowerCase();
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
                to="/menu"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive("/menu")
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-900"
                }`}
              >
                <ClipboardList className="w-4 h-4" />
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
                    to="/menu"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Ver toda la carta
                  </Link>

                  <div className="h-px bg-gray-100" />

                  {/* COMBOS - Todos los tipos de menú */}
                  {tiposMenuUnicos.length > 0 && (
                    <div className="py-2">
                      <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Combos
                      </p>
                      {tiposMenuUnicos.map((tipo) => {
                        const Icon = getComboIcon(tipo);
                        return (
                          <Link
                            key={tipo}
                            to={`/menu/tipo/${normalizeString(tipo)}`}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-amber-600" />
                            <span className="capitalize">
                              {tipo.replace("_", " ")}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  <div className="h-px bg-gray-100" />

                  {/* ÁRMALO - Todos los tipos de producto */}
                  {tiposProductoUnicos.length > 0 && (
                    <div className="py-2">
                      <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Ármalo
                      </p>
                      {tiposProductoUnicos.map((tipo) => {
                        const Icon = getProductoIcon(tipo);
                        return (
                          <Link
                            key={tipo}
                            to={`/menu/productos/tipo/${normalizeString(tipo)}`}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-amber-600" />
                            <span className="capitalize">
                              {tipo.replace("_", " ")}
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
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Inicio */}
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
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
                to="/menu"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive("/menu")
                    ? "bg-amber-900 text-white"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                Ver toda la carta
              </Link>

              {/* Combos */}
              {tiposMenuUnicos.length > 0 && (
                <div className="ml-4">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Combos
                  </p>
                  {tiposMenuUnicos.map((tipo) => {
                    const Icon = getComboIcon(tipo);
                    return (
                      <Link
                        key={tipo}
                        to={`/menu/tipo/${normalizeString(tipo)}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <Icon className="w-4 h-4 text-amber-600" />
                        {tipo.replace("_", " ")}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Ármalo */}
              {tiposProductoUnicos.length > 0 && (
                <div className="ml-4">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Ármalo
                  </p>
                  {tiposProductoUnicos.map((tipo) => {
                    const Icon = getProductoIcon(tipo);
                    return (
                      <Link
                        key={tipo}
                        to={`/menu/productos/tipo/${normalizeString(tipo)}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-amber-900 rounded-lg hover:bg-amber-50"
                      >
                        <Icon className="w-4 h-4 text-amber-600" />
                        {tipo.replace("_", " ")}
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
                onClick={() => setMenuOpen(false)}
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
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>
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
