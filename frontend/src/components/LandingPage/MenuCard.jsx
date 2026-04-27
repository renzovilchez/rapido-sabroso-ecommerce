import { Link } from "react-router-dom";

const MenuCard = ({ name, imageUrl, to }) => (
  <Link
    to={to}
    className="group block rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#F0E4CC] transition-all duration-300 hover:shadow-xl"
  >
    <div className=" overflow-hidden bg-[#FBF5EC]">
      <img
        src={imageUrl}
        alt={`Hamburguesa ${name}`}
        className="h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300?text=🍔";
        }}
      />
    </div>
    <div className="px-4 py-3 font-semibold text-[#4B2E00] text-center text-sm md:text-base">
      {name}
    </div>
  </Link>
);

export default MenuCard;
