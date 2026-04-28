import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function Cart() {
  const navigate = useNavigate();
  const { setCartItemCount, isLoggedIn } = useContext(GlobalContext);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("carrito");
    if (savedData) {
      try {
        const parsedCart = JSON.parse(savedData);
        if (Array.isArray(parsedCart)) {
          const normalizedCart = parsedCart.map((item) => ({
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity),
          }));
          setCart(normalizedCart);
        }
      } catch (error) {
        console.error("Error al leer el carrito desde localStorage:", error);
      }
    }
  }, []);

  // Update localStorage and total when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("carrito", JSON.stringify(cart));
    } else {
      localStorage.removeItem("carrito");
    }

    const calculatedTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(calculatedTotal);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemCount(totalQuantity);
  }, [cart, setCartItemCount]);

  const increaseQuantity = (itemId, type = 'product') => {
    setCart((prev) =>
      prev.map((item) => {
        const isSameItem = type === 'product' 
          ? item.productId === itemId 
          : item.menuId === itemId;
        
        return isSameItem
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }),
    );
  };

  const decreaseQuantity = (itemId, type = 'product') => {
    setCart((prev) =>
      prev.map((item) => {
        const isSameItem = type === 'product' 
          ? item.productId === itemId 
          : item.menuId === itemId;

        return isSameItem && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }),
    );
  };

  const removeItem = (itemId, type = 'product') => {
    setCart((prev) => prev.filter((item) => {
      const isSameItem = type === 'product' 
        ? item.productId === itemId 
        : item.menuId === itemId;
      return !isSameItem;
    }));
  };

  const goToCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    } else {
      navigate("/pago");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-[#feefc3] rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        🛒 Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <p className="text-[#1f1f1f] text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const itemId = item.productId || item.menuId;
            const itemType = item.productId ? 'product' : 'menu';
            
            return (
              <div
                key={`${itemType}-${itemId}`}
                className="flex justify-between items-center border-b border-yellow-400 pb-4 bg-white/60 p-3 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg text-[#1f1f1f]">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#4f4f4f]">
                    Precio: S/.{Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-[#4f4f4f]">
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => increaseQuantity(itemId, itemType)}
                    className="px-3 py-1 bg-[#eea539] hover:bg-[#f0b750] text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(itemId, itemType)}
                    className={`px-3 py-1 ${
                      item.quantity > 1
                        ? "bg-[#d8851e] hover:bg-[#c97417]"
                        : "bg-gray-300 cursor-not-allowed"
                    } text-white rounded`}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(itemId, itemType)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold text-[#1f1f1f]">
              Total: S/.{total.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/carta"
          className="text-[#eea539] hover:underline font-medium block mb-4"
        >
          Continuar comprando
        </Link>

        {cart.length > 0 && (
          <button
            onClick={goToCheckout}
            className="px-6 py-3 bg-[#e53935] hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Pagar
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
