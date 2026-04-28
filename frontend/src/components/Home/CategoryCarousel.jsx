import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, Loader2 } from "lucide-react";

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

// Category colors for card backgrounds
const categoryColors = {
  hamburguesas: "from-red-500 to-orange-600",
  bebidas: "from-blue-500 to-cyan-600",
  extras: "from-amber-500 to-yellow-600",
  postres: "from-pink-500 to-rose-600",
};

const getCategoryGradient = (name) => {
  const key = Object.keys(categoryColors).find((k) =>
    name.toLowerCase().includes(k),
  );
  return categoryColors[key] || "from-amber-500 to-orange-600";
};

const CategoryCarousel = () => {
  const [categoriesWithTypes, setCategoriesWithTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithTypes = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/categories/with-types/all",
        );
        if (!res.ok) throw new Error("No se pudo obtener las categorías.");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Datos inválidos.");
        setCategoriesWithTypes(data);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesWithTypes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="ml-3 text-gray-600 font-medium">
          Cargando delicias...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <Flame className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Título general */}
      <div className="text-center space-y-3">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900">
          Nuestras{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            Categorías
          </span>
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Descubre todo lo que tenemos para ti. Desde hamburguesas jugosas hasta
          bebidas refrescantes.
        </p>
      </div>

      {categoriesWithTypes.map((category) => (
        <div key={category.categoryId} className="group/section">
          {/* Header de categoría */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center shadow-lg`}
              >
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.types?.length || 0} opciones disponibles
                </p>
              </div>
            </div>
            <Link
              to={`/carta`}
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors group/link"
            >
              Ver todo
              <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Carousel */}
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.8, spaceBetween: 24 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            navigation
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="!pb-4 !px-2"
          >
            {category.types.map((type) => (
              <SwiperSlide key={type.typeId}>
                <Link
                  to={`/carta/${normalizeString(type.name)}`}
                  className="block group/card"
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    {/* Imagen */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={
                          type.image
                            ? `http://localhost:5000/images/${type.image}`
                            : "https://placehold.co/400x300/e5e7eb/9ca3af?text=Sin+imagen"
                        }
                        alt={type.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        loading="lazy"
                      />
                      {/* Overlay en hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                      {/* Badge de "Ver más" en hover */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover/card:opacity-100 translate-y-4 group-hover/card:translate-y-0 transition-all duration-300">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full shadow-lg">
                          Explorar
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-gray-900 group-hover/card:text-amber-600 transition-colors">
                        {type.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Haz clic para ver opciones
                      </p>
                    </div>

                    {/* Barra de color inferior */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${getCategoryGradient(category.name)} transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default CategoryCarousel;
