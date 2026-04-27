import NavLink from "./NavLink";
import Brand from "./Brand";

const COLORS = {
  bg: "#FFFDF9",
  border: "#F0E4CC",
  text: "#4B2E00",
  textMuted: "#6B4C2A",
  accent: "#F5A623",
  accentHover: "#D4860A",
};

const NavbarLanding = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="w-full h-[5rem] md:h-[5.5rem] flex items-center justify-between px-5 md:px-10 lg:px-16"
        style={{
          background: "rgba(255, 253, 249, 0.95)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          borderBottom: `1.5px solid ${COLORS.border}`,
        }}
      >
        <Brand />

        {/* Navegación desktop */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/login" variant="ghost">
            Iniciar sesión
          </NavLink>
          <NavLink to="/register" variant="outline">
            Registrarse
          </NavLink>
          <NavLink to="/home" variant="primary">
            Comenzar
          </NavLink>
        </div>

        {/* Navegación móvil */}
        <div className="flex md:hidden items-center gap-2">
          <NavLink to="/home" variant="primary">
            Comenzar
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLanding;
