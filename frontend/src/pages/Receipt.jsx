import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import ComprobantePDF from "../components/ReceiptPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

const Comprobante = () => {
  const { idPedido } = useParams();
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarComprobante = async () => {
      try {
        const res = await api.getComprobantePorPedido(idPedido);
        setComprobante(res.data);
      } catch (error) {
        console.error("Error al cargar comprobante:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarComprobante();
  }, [idPedido]);

  if (loading) return <p>Cargando comprobante...</p>;
  if (!comprobante) return <p>No se encontró el comprobante.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">
        Comprobante: {comprobante.numeroSerie}
      </h1>

      {/* Vista previa del PDF */}
      <PDFViewer
        style={{ width: "100%", height: "600px", borderRadius: "8px" }}
      >
        <ComprobantePDF comprobante={comprobante} />
      </PDFViewer>

      {/* Botón para descargar el PDF */}
      <PDFDownloadLink
        document={<ComprobantePDF comprobante={comprobante} />}
        fileName={`comprobante-${idPedido}.pdf`}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded inline-block"
      >
        {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default Comprobante;
