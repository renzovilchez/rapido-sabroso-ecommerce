import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('carrito');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const formatted = parsed.map(p => ({
        ...p,
        productId: p.productId || p.idProducto || p.id_producto || null,
        menuId: p.menuId || p.idCarta || p.id_menu || null,
        name: p.name || p.nombre || p.nombreProducto || "Producto",
        price: Number(p.price || p.precio || p.precioProducto || 0),
        quantity: Number(p.quantity || p.cantidad || 0),
        type: p.type || (p.idCarta || p.id_menu ? 'menu' : 'product')
      }));
      setCart(formatted);

      const calculatedTotal = formatted.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(calculatedTotal);

    } catch (err) {
      console.error("Error leyendo carrito:", err);
    }
  }, []);

  return { cart, total };
}