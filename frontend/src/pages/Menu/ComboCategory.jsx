import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useCartStore from "../../store/cartStore";
import MenuCard from "../../components/Menu/MenuCard";
import { normalizeString } from "../../utils/stringUtils";

function ComboCategory() {
  const { tipo } = useParams();
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function fetchCombos() {
      try {
        const res = await axios.get("http://localhost:5000/api/combos");
        setCombos(res.data);
      } catch (err) {
        setError(err.message || "Error al cargar los combos");
      } finally {
        setLoading(false);
      }
    }

    fetchCombos();
  }, []);

  const addToCart = (combo) => {
    addItem({
      menuId: Number(combo.menuId),
      name: combo.name,
      price: Number(combo.price),
      image: combo.image || '',
    });
  };

  if (loading) return <p className="text-center mt-8">Cargando combos...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  // Filter combos by category (tipo from URL)

  const filteredCombos = combos.filter(
    (c) => normalizeString(c.category) === tipo,
  );

  if (filteredCombos.length === 0) {
    return <p className="text-center mt-8">No hay opciones para "{tipo}"</p>;
  }

  return (
    <div className="max-w-7xl m-auto mt-8 mb-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-yellow-700 text-center">
        Opciones {tipo}
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredCombos.map((combo) => (
          <MenuCard
            key={combo.menuId}
            menuItem={combo}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ComboCategory;
