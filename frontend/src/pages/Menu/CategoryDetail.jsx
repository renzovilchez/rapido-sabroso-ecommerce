import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { GlobalContext } from '../../context/GlobalContext';

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

function CategoryDetail() {
  const { tipo } = useParams(); // URL param (slug)
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);
  const hasLoadedLocalStorage = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasLoadedLocalStorage.current) {
      const savedCart = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalInCart = savedCart.reduce((acc, item) => acc + item.cantidad, 0);
      setCartItemCount(totalInCart);
      hasLoadedLocalStorage.current = true;
    }

    axios.get('http://localhost:5000/api/products')
      .then(response => {
        const camelCaseProducts = response.data.map(p => ({
          productId: p.id_producto,
          name: p.nombre,
          description: p.descripcion,
          price: p.precio,
          stock: p.stock,
          image: p.imagen,
          productType: p.tipoProducto,
          productCategory: p.categoriaProducto,
        }));
        setProducts(camelCaseProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('No se pudo cargar el menú. Intenta nuevamente más tarde.');
        setLoading(false);
      });
  }, [setCartItemCount]);

  // Original product type for display title
  const originalType = products.find(p => normalizeString(p.productType) === tipo.toLowerCase())?.productType || tipo;

  // Filter products by type matching the URL slug
  const filteredProducts = products.filter(p => normalizeString(p.productType) === tipo.toLowerCase());

  // Function to add to cart
  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('carrito')) || [];
    const productId = Number(product.productId);

    const exists = currentCart.find(p => p.productId === productId);
    let newCart;

    const newItem = {
      productId,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      quantity: 1,
      type: 'product',
      productType: product.productType || 'other',
    };

    if (exists) {
      newCart = currentCart.map(p =>
        p.productId === productId
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      newCart = [...currentCart, newItem];
    }

    localStorage.setItem('carrito', JSON.stringify(newCart));

    const total = newCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(total);
  };

  if (loading) return <p className="text-center mt-8">Cargando productos...</p>;

  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">{originalType}</h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg text-center font-semibold mb-6">
          {error}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">No hay productos para esta categoría.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.productId}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryDetail;
