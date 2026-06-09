import {
  Sparkles,
  UtensilsCrossed,
  Sandwich,
  ClipboardList,
  Beef,
  Flame,
  Leaf,
  Crown,
  GlassWater,
  Citrus,
  Droplets,
  Wine,
  Coffee
} from "lucide-react";

/**
 * Returns the appropriate Lucide icon for a combo category
 * @param {string} categoryName 
 */
export const getComboIcon = (categoryName) => {
  const name = (categoryName || "").toLowerCase();
  if (name.includes("personal")) return Sparkles;
  if (name.includes("familiar")) return UtensilsCrossed;
  if (name.includes("duo") || name.includes("pareja")) return Sandwich;
  if (name.includes("ejecutivo")) return ClipboardList;
  return Sparkles;
};

/**
 * Returns the appropriate Lucide icon for a product category
 * @param {string} categoryName 
 */
export const getProductIcon = (categoryName) => {
  const name = (categoryName || "").toLowerCase();
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

/**
 * Returns a hero image for a category group
 * @param {string} groupName 
 */
export const getCategoryHeroImage = (groupName) => {
  const name = groupName.toLowerCase();
  if (name.includes("combo")) return "/src/assets/images/categories/combo_hero.png";
  if (name.includes("hamburguesa")) return "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop"; // Burger placeholder
  if (name.includes("bebida")) return "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=800&auto=format&fit=crop"; // Drinks placeholder
  return "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"; // Pizza/Generic
};
