import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate, Link } from "react-router-dom";

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const CategoriaTiposCarousel = () => {
  const navigate = useNavigate();
  const [categoriasPorTipo, setCategoriasPorTipo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriasPorTipo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categorias/con-tipos/all");
        if (!res.ok) {
          throw new Error("No se pudo obtener las categorías.");
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Datos inválidos desde el servidor.");
        }

        setCategoriasPorTipo(data);
      } catch (error) {
        console.error("Error al cargar categorías por tipo:", error);
        setError("No se pudieron cargar las categorías. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriasPorTipo();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-medium">Cargando...</p>;
  }

  return (
    <div className="space-y-10 px-4 py-8">
      <h2 className="text-4xl font-bold text-yellow-600 text-center">Conoce Las diferentes catergorias de productos</h2>
      {error ? (
        <p className="text-center text-red-600 text-lg font-semibold">{error}</p>
      ) : (

        categoriasPorTipo.map((categoria) => (
          <div key={categoria.id_categoria}>
            <h2 className="text-2xl font-bold mb-8 text-center text-yellow-600">{categoria.nombre}</h2>

            <Swiper
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              navigation
              modules={[Navigation]}
              className="mySwiper"
            >
              {categoria.tipos.map((tipo) => (
                <SwiperSlide key={tipo.id_tipo_producto}>
                  <div
                    className="bg-yellow-500 text-white rounded-2xl shadow-md p-2 h-full text-center cursor-pointer hover:shadow-2xl transition"
                  >
                    <Link
                      to={`/menu/productos/tipo/${normalizeString(tipo.nombre)}`}>
                      <div className="overflow-hidden rounded-xl mb-4">
                        <img
                          src={
                            tipo.imagen
                              ? `http://localhost:5000/images/${tipo.imagen}`
                              : "https://placehold.co/300x200.png?text=Sin+imagen"
                          }
                          alt={tipo.nombre}
                          className="w-full h-full rounded-xl transform hover:scale-110 transition duration-300"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-black">{tipo.nombre}</h3>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoriaTiposCarousel;