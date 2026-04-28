import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import MenuCard from '../../components/Menu/MenuCard';

function ComboCategory() {
  const { tipo } = useParams(); // Keep frontend params as is
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);
  const hasLoadedLocalStorage = useRef(false);

  useEffect(() => {
    async function fetchCombos() {
      try {
        const res = await axios.get('http://localhost:5000/api/combos');
        setCombos(res.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los combos');
      } finally {
        setLoading(false);
      }
    }

    fetchCombos();
  }, []);

  const addToCart = (combo) => {
    const currentCart = JSON.parse(localStorage.getItem('carrito')) || [];

    const menuId = Number(combo.menuId);

    const exists = currentCart.find(item => item.type === 'combo' && item.menuId === menuId);

    let newCart;
    if (exists) {
      newCart = currentCart.map(item =>
        item.type === 'combo' && item.menuId === menuId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem = {
        menuId,
        name: combo.name,
        description: combo.description,
        price: Number(combo.price),
        image: combo.image || '',
        quantity: 1,
        type: 'combo',
      };
      newCart = [...currentCart, newItem];
    }

    localStorage.setItem('carrito', JSON.stringify(newCart));
    const total = newCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(total);
  };

  if (loading) return <p className="text-center mt-8">Cargando combos...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  // Filter combos by category (tipo from URL)
  const filteredCombos = combos.filter(c => c.category === tipo);

  if (filteredCombos.length === 0) {
    return <p className="text-center mt-8">No hay opciones para "{tipo}"</p>;
  }

  return (
    <div className='max-w-7xl m-auto mt-8 mb-8 px-4'>
      <h1 className="text-2xl font-bold mb-4 text-yellow-700 text-center">
        Opciones {tipo}
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredCombos.map(combo => (
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
