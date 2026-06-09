import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./carrusel.css";
import BannerCarousel from "../../components/Menu/BannerCarousel";
import { normalizeString } from "../../utils/stringUtils";
import { 
  getComboIcon, 
  getProductIcon, 
  getCategoryHeroImage 
} from "../../utils/categoryUtils";
import { 
  ChevronRight, 
  ArrowRight,
  Utensils,
  Flame,
  GlassWater
} from "lucide-react";

function MenuIndex() {
  const [combos, setCombos] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [combosRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/combos"),
          axios.get("http://localhost:5000/api/products")
        ]);
        setCombos(combosRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Error loading menu data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const uniqueComboCategories = [
    ...new Set(combos.map((c) => c.category).filter(Boolean)),
  ];

  const uniqueProductCategories = [
    ...new Set(products.map((p) => p.productType).filter(Boolean)),
  ];

  const renderCategoryCard = (category, type, isCombo = false) => {
    const Icon = isCombo ? getComboIcon(category) : getProductIcon(category);
    const path = isCombo 
      ? `/carta/combo/${normalizeString(category)}` 
      : `/carta/${normalizeString(category)}`;
    
    // Group categories for hero images
    let group = "generic";
    if (isCombo) group = "combo";
    else if (category.toLowerCase().includes("hamburguesa")) group = "hamburguesa";
    else if (category.toLowerCase().includes("bebida") || category.toLowerCase().includes("refresco")) group = "bebida";

    return (
      <Link
        key={category}
        to={path}
        className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 group-hover:bg-orange-200 transition-colors duration-500" />
        
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Icon size={28} />
            </div>
            <div className="bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-100">
              {isCombo ? "Combo Oferta" : "A tu gusto"}
            </div>
          </div>
          
          <h3 className="text-xl font-black text-gray-900 mb-2 capitalize leading-tight">
            {category.replace("_", " ")}
          </h3>
          
          <p className="text-gray-500 text-sm mb-6 flex-grow">
            Explora nuestra variedad de {category.toLowerCase().replace("_", " ")} preparados al instante.
          </p>
          
          <div className="flex items-center text-amber-600 font-bold text-sm group-hover:gap-2 transition-all">
            VER CARTA <ArrowRight size={16} className="ml-1" />
          </div>
        </div>

        {/* Hover image preview (subtle) */}
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
           <Icon size={80} className="text-amber-900" />
        </div>
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dynamic Header */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <span className="inline-block bg-amber-500 text-white text-xs font-black px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Rápido & Sabroso
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            ¿QUÉ TE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">PROVOCA</span> HOY?
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Desde las hamburguesas más jugosas hasta los combos familiares más generosos. Todo listo para disfrutar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-16 relative z-20 space-y-16">
        {/* Banner Section */}
        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
          <BannerCarousel />
        </div>

        {/* Combos Section */}
        <section>
          <div className="flex items-end justify-between mb-8 px-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Flame size={20} className="fill-amber-600" />
                <span className="text-sm font-black uppercase tracking-tighter">Lo más pedido</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">COMBOS INCREÍBLES</h2>
            </div>
            <div className="hidden md:block h-px flex-grow mx-8 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueComboCategories.map((cat) => renderCategoryCard(cat, "combo", true))}
          </div>
        </section>

        {/* Featured Hero for Burgers */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 md:p-12 shadow-xl">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4">ARMA TU PROPIO FESTÍN</h2>
            <p className="text-amber-100 text-lg mb-8">
              Combina nuestras hamburguesas gourmet con tus complementos y bebidas favoritas. 
              ¡Tú pones el límite!
            </p>
            <div className="flex flex-wrap gap-4">
               {uniqueProductCategories.slice(0, 4).map(cat => (
                 <Link 
                   key={cat} 
                   to={`/carta/${normalizeString(cat)}`}
                   className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-bold transition-all text-sm uppercase tracking-wide border border-white/30"
                 >
                   {cat.replace("_", " ")}
                 </Link>
               ))}
            </div>
          </div>
          {/* Hero Image Decoration */}
          <div className="absolute top-0 right-0 h-full w-1/2 hidden lg:block">
            <img 
              src="/src/assets/images/categories/combo_hero.png" 
              alt="Burgers Hero" 
              className="h-full w-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-700" />
          </div>
        </section>

        {/* All Products Categories */}
        <section>
          <div className="flex items-end justify-between mb-8 px-4">
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Utensils size={20} />
                <span className="text-sm font-black uppercase tracking-tighter">Variedad total</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">NUESTRA VARIEDAD</h2>
            </div>
            <div className="hidden md:block h-px flex-grow mx-8 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueProductCategories.map((cat) => renderCategoryCard(cat, "product", false))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-lg border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">¿LISTO PARA EL SABOR?</h2>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">
              Realiza tu pedido por WhatsApp y recíbelo en la puerta de tu casa. Rápido, seguro y delicioso.
            </p>
            <a
              href="https://wa.me/51987654321"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 hover:bg-green-600 text-white font-black rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 uppercase tracking-widest"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              ORDENAR POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuIndex;
