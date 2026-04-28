import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HistorialPedido = () => {
  const [comprobantes, setComprobantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cliente = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/receipts/customer/${cliente.id_cliente}`);
        const data = await response.json();
        setComprobantes(data);
      } catch (error) {
        console.error('Error al obtener historial:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cliente?.id_cliente) {
      fetchHistorial();
    }
  }, [cliente?.id_cliente]);

  if (loading) return <p className="text-center">Cargando historial...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Pedidos</h2>
      {comprobantes.length === 0 ? (
        <p>No tienes comprobantes registrados.</p>
      ) : (
        <table className="w-full border text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Serie</th>
              <th className="p-2 border">Correlativo</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {comprobantes.map((item) => (
              <tr key={item.id_comprobante}>
                <td className="p-2 border">{new Date(item.fecha).toLocaleString()}</td>
                <td className="p-2 border">{item.tipo}</td>
                <td className="p-2 border">{item.serie}</td>
                <td className="p-2 border">{item.correlativo}</td>
                <td className="p-2 border">S/ {item.total_pedido}</td>
                <td className="p-2 border">{item.direccion}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => navigate(`/comprobante/${item.id_pedido}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Ver más
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialPedido;
