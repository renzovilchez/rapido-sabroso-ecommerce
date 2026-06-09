import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
import useCartStore from "../../store/cartStore";
import { normalizeString } from "../../utils/stringUtils";

function CategoryDetail() {
  const { tipo } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const addItem = useCartStore((s) => s.addItem);
  const hasLoadedLocalStorage = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hasLoadedLocalStorage.current = true;

    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const camelCaseProducts = response.data.map((p) => ({
          productId: p.productId,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          image: p.image,
          productType: p.productType,
          productCategory: p.productCategory,
        }));
        setProducts(camelCaseProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar el menú. Intenta nuevamente más tarde.");
        setLoading(false);
      });
  }, []);

  // Original product type for display title
  const originalType =
    products.find((p) => normalizeString(p.productType) === tipo.toLowerCase())
      ?.productType || tipo;

  // Filter products by type matching the URL slug
  const filteredProducts = products.filter(
    (p) => normalizeString(p.productType) === tipo.toLowerCase(),
  );

  const addToCart = (product) => {
    addItem({
      productId: Number(product.productId),
      name: product.name,
      price: Number(product.price),
      image: product.image || '',
    });
  };

  if (loading) return <p className="text-center mt-8">Cargando productos...</p>;

  return (
    <div className="max-w-7xl m-auto mt-8 mb-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">
        {originalType}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg text-center font-semibold mb-6">
          {error}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">
          No hay productos para esta categoría.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
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
