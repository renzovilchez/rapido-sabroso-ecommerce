import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function OrderSummary() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('carrito');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                const normalizedCart = parsedCart.map(item => ({
                    ...item,
                    price: Number(item.price || item.precio || item.precioProducto || 0),
                    quantity: Number(item.quantity || item.cantidad || 0),
                    name: item.name || item.nombre || item.nombreProducto || "Producto",
                }));
                setItems(normalizedCart);
            } catch (error) {
                console.error("Error al leer el carrito desde localStorage:", error);
            }
        }
    }, []);

    const calculateTotal = () => items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculateTax = (total) => total - (total / 1.18);
    const calculateBaseAmount = (total) => total / 1.18;

    const total = calculateTotal();
    const tax = calculateTax(total);
    const baseAmount = calculateBaseAmount(total);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 bg-[#feefc3] p-4 rounded-xl shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-4 text-[#1f1f1f]">
                Resumen de Productos
            </h2>

            {items.length > 0 ? (
                <motion.table
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full table-auto mb-4 bg-white rounded-lg overflow-hidden"
                >
                    <thead className="bg-[#ebebeb] text-[#1f1f1f]">
                        <tr>
                            <th className="border p-2">Producto</th>
                            <th className="border p-2">Cantidad</th>
                            <th className="border p-2">Precio Unitario</th>
                            <th className="border p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="text-[#1f1f1f]">
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2">{item.quantity}</td>
                                <td className="border p-2">S/ {item.price.toFixed(2)}</td>
                                <td className="border p-2">S/ {(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </motion.table>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}

            <div className="flex justify-between text-[#1f1f1f]">
                <p className="font-semibold">Subtotal:</p>
                <p>S/ {total.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mt-2 text-[#1f1f1f]">
                <p className="font-semibold">Monto Base:</p>
                <p>S/ {baseAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mt-2 text-[#1f1f1f]">
                <p className="font-semibold">IGV (18%):</p>
                <p>S/ {tax.toFixed(2)}</p>
            </div>
        </motion.div>
    );
}

export default OrderSummary;