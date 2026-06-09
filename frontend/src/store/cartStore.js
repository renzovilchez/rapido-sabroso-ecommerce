import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const normalizeCartItem = (item) => ({
  productId: item.productId || item.idProducto || item.id_producto || null,
  menuId: item.menuId || item.idCarta || item.id_menu || null,
  name: item.name || item.nombre || item.nombreProducto || 'Producto',
  price: Number(item.price || item.precio || item.precioProducto || 0),
  quantity: Number(item.quantity || item.cantidad || 0),
  type: item.type || (item.idCarta || item.id_menu ? 'menu' : 'product'),
  image: item.image || '',
});

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      total: 0,
      addItem: (item) => {
        const items = get().items;
        const normalized = normalizeCartItem(item);
        const existingIndex = items.findIndex(
          (i) =>
            (normalized.productId && i.productId === normalized.productId) ||
            (normalized.menuId && i.menuId === normalized.menuId)
        );
        let newItems;
        if (existingIndex >= 0) {
          newItems = items.map((i, idx) =>
            idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [...items, { ...normalized, quantity: 1 }];
        }
        set(computeDerived(newItems));
      },
      removeItem: (id, type = 'product') => {
        const newItems = get().items.filter(
          (i) => (type === 'product' ? i.productId !== id : i.menuId !== id)
        );
        set(computeDerived(newItems));
      },
      updateQuantity: (id, quantity, type = 'product') => {
        const newItems = get().items.map((i) =>
          (type === 'product' ? i.productId === id : i.menuId === id)
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        );
        set(computeDerived(newItems));
      },
      increaseQuantity: (id, type = 'product') => {
        const items = get().items;
        const newItems = items.map((i) =>
          (type === 'product' ? i.productId === id : i.menuId === id)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        set(computeDerived(newItems));
      },
      decreaseQuantity: (id, type = 'product') => {
        const items = get().items;
        const newItems = items.map((i) =>
          (type === 'product' ? i.productId === id : i.menuId === id) && i.quantity > 1
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
        set(computeDerived(newItems));
      },
      clearCart: () => set({ items: [], count: 0, total: 0 }),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.items?.length) {
          const derived = computeDerived(state.items);
          useCartStore.setState(derived);
        }
      },
    }
  )
);

function computeDerived(items) {
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return { items, count, total };
}

export default useCartStore;
