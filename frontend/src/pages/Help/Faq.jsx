import { useState } from "react";

function AyudaPreguntas() {
  const [activeIndex, setActiveIndex] = useState(null);

  const preguntas = [
    {
      pregunta: "¿Cómo puedo hacer un pedido?",
      respuesta:
        "Ve al menú, selecciona tus productos, agrégalos al carrito y finaliza la compra llenando tus datos.",
    },
    {
      pregunta: "¿Necesito registrarme para comprar?",
      respuesta:
        "Si es obligatorio, si te registras podrás ver tu historial",
    },
    {
      pregunta: "¿Puedo modificar un pedido luego de enviarlo?",
      respuesta:
        "Por ahora no es posible.",
    },
  ];

  const togglePregunta = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="px-4 md:px-16 py-10 bg-yellow-50 min-h-screen text-brown-800">
      <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8">Preguntas Frecuentes</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {preguntas.map((item, index) => (
          <div key={index} className="border border-yellow-300 rounded-xl overflow-hidden">
            <button
              onClick={() => togglePregunta(index)}
              className="w-full text-left px-6 py-4 bg-yellow-100 hover:bg-yellow-200 transition-colors text-yellow-800 font-semibold focus:outline-none"
            >
              {item.pregunta}
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-white text-brown-700 border-t border-yellow-200">
                {item.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AyudaPreguntas;