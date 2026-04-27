import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
const TYPOGRAPHY = "font-['Playfair_Display']";

const Brand = () => (
  <Link to="/" className="flex items-center gap-3.5 group">
    <div className="relative -my-1">
      <img
        src={Logo}
        alt="Rápido y Sabroso"
        width={70}
        height={70}
        className="object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
      />
    </div>
    <div className="flex flex-col leading-tight">
      <span
        className={`${TYPOGRAPHY} font-bold text-[#4B2E00] text-xl md:text-[1.35rem] tracking-tight`}
      >
        Rápido y Sabroso
      </span>
    </div>
  </Link>
);

export default Brand;
