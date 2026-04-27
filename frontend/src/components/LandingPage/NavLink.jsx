import { Link } from "react-router-dom";

const NavLink = ({ to, children, variant = "ghost" }) => {
  const styles = {
    ghost: "text-[#6B4C2A] hover:text-[#4B2E00] hover:bg-[#F0E4CC]/50",
    outline:
      "text-[#4B2E00] border-2 border-[#F5A623] hover:bg-[#F5A623] hover:scale-[1.03] active:scale-[0.97]",
    primary:
      "bg-[#C0392B] text-white hover:bg-[#A93226] shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97]",
  };

  const base =
    "inline-flex items-center justify-center rounded-full transition-all duration-200 font-semibold";

  const sizing =
    variant === "primary"
      ? "px-6 py-3 text-sm"
      : variant === "outline"
        ? "px-5 py-2.5 text-sm"
        : "px-4 py-2.5 text-sm";

  return (
    <Link to={to} className={`${base} ${sizing} ${styles[variant]}`}>
      {children}
    </Link>
  );
};

export default NavLink;
