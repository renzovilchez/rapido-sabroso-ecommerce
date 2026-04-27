import { Link } from "react-router-dom";

const Button = ({ to, variant = "primary", children, className = "" }) => {
  const variants = {
    primary: "bg-[#C0392B] text-white hover:bg-[#A93226] hover:scale-105",
    secondary:
      "bg-transparent text-[#4B2E00] border-2 border-[#F5A623] hover:bg-[#F5A623] hover:scale-105",
    cta: "bg-[#F5A623] text-[#4B2E00] font-bold hover:bg-[#D4860A] hover:text-white",
  };

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold transition-all duration-200 active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Button;
