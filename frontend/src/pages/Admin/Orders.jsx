import React, { useEffect, useState } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [detalleVisible, setDetalleVisible] = useState(null);

  const API_PEDIDOS = "http://localhost:5000/api/orders";
  const API_DETALLES = "http://localhost:5000/api/order-details";

  // Obtener pedidos
  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_PEDIDOS);
      const data = await res.json();
      setPedidos(Array.isArray(data) ? data : [data]); // Aseguramos array
    } catch (err) {
      setMessage({ type: "error", text: "Error al cargar pedidos" });
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalles para un pedido específico
  const fetchDetalles = async (id_pedido) => {
    try {
      const res = await fetch(API_DETALLES);
      const data = await res.json();
      const filtrados = Array.isArray(data)
        ? data.filter((d) => d.id_pedido === id_pedido)
        : [];
      setDetalles((prev) => ({ ...prev, [id_pedido]: filtrados }));
    } catch (err) {
      setMessage({
        type: "error",
        text: "Error al cargar detalles del pedido",
      });
    }
  };

  const toggleDetalles = (id_pedido) => {
    if (detalleVisible === id_pedido) {
      setDetalleVisible(null);
    } else {
      setDetalleVisible(id_pedido);
      if (!detalles[id_pedido]) {
        fetchDetalles(id_pedido);
      }
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Pedidos</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error"
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-center">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-center text-gray-600">No hay pedidos registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto shadow rounded">
            <thead>
              <tr className="bg-indigo-600 text-white text-sm">
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Dirección</th>
                <th className="px-4 py-2">Método Pago</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <React.Fragment key={p.id_pedido}>
                  <tr className="even:bg-gray-100 hover:bg-gray-200">
                    <td className="px-4 py-2">{p.cliente}</td>
                    <td className="px-4 py-2 text-center">
                      {new Date(p.fecha).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      S/ {parseFloat(p.total).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm">{p.direccion_entrega}</td>
                    <td className="px-4 py-2 text-center">
                      {p.metodo_pago || "—"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => toggleDetalles(p.id_pedido)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        {detalleVisible === p.id_pedido
                          ? "Ocultar"
                          : "Ver Detalles"}
                      </button>
                    </td>
                  </tr>

                  {/* Detalles del pedido */}
                  {detalleVisible === p.id_pedido && detalles[p.id_pedido] && (
                    <tr>
                      <td colSpan="6" className="bg-white px-6 py-4">
                        <h3 className="font-semibold text-lg mb-2">
                          Detalles del Pedido
                        </h3>
                        {detalles[p.id_pedido].length === 0 ? (
                          <p className="text-gray-600">
                            Sin detalles disponibles.
                          </p>
                        ) : (
                          <table className="w-full border text-sm">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border px-2 py-1">#</th>
                                <th className="border px-2 py-1">
                                  Producto/Carta ID
                                </th>
                                <th className="border px-2 py-1">Cantidad</th>
                                <th className="border px-2 py-1">Precio</th>
                                <th className="border px-2 py-1">Subtotal</th>
                                <th className="border px-2 py-1">IGV</th>
                              </tr>
                            </thead>
                            <tbody>
                              {detalles[p.id_pedido].map((d, i) => (
                                <tr key={d.id_detalle_pedido}>
                                  <td className="border px-2 py-1 text-center">
                                    {i + 1}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {d.id_producto ?? d.id_carta}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {d.cantidad}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    S/ {d.precio}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    S/ {d.subtotal}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    S/ {d.igv}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Pedidos;

