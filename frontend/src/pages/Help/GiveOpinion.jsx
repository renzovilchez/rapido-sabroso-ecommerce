function AyudaOpinion() {
  return (
    <div className="px-4 md:px-16 py-10 bg-yellow-50 min-h-screen text-brown-800">
      <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8">Danos tu opinión</h1>

      <p className="text-center max-w-2xl mx-auto text-yellow-800 mb-10">
        Tu opinión es importante para mejorar nuestro servicio. Cuéntanos qué te gustó, qué podríamos mejorar o si tuviste algún inconveniente.
      </p>

      <form className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-yellow-200">
        <div className="mb-6">
          <label htmlFor="nombre" className="block text-yellow-700 font-semibold mb-2">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Escribe tu nombre"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-yellow-700 font-semibold mb-2">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="mensaje" className="block text-yellow-700 font-semibold mb-2">Tu mensaje</label>
          <textarea
            id="mensaje"
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Escríbenos tu opinión..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Enviar opinión
        </button>
      </form>
    </div>
  );
}

export default AyudaOpinion;