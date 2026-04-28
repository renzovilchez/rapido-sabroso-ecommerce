function AyudaManual() {
  return (
    <div className="px-4 md:px-16 py-10 bg-yellow-50 min-h-screen text-brown-800 max-w-4xl m-auto">
      <h1 className="text-4xl font-bold mb-8 text-yellow-600 text-center">Manual de Usuario</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">1. ¿Cómo registrarse?</h2>
        <p>
          Haz clic en el botón <strong>“Iniciar Sesión”</strong> ubicado en la parte superior derecha. Luego selecciona la opción <strong>“Registrarse”</strong> y completa tus datos. Esto te permitirá guardar tus pedidos y acumular puntos.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">2. ¿Cómo hacer un pedido?</h2>
        <p>
          Ve a la sección <strong>“Menú”</strong>, elige tus hamburguesas o bebidas favoritas y agrégalas al carrito. Luego haz clic en <strong>“Pagar”</strong>, completa los datos y confirma tu pedido.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">3. ¿Dónde veo mis pedidos?</h2>
        <p>
          Inicia sesión y entra a tu panel de cliente. Ahí podrás ver todos tus pedidos anteriores con sus detalles, fechas y puntos ganados.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">4. ¿Qué hacer si tengo un problema?</h2>
        <p>
          Dirígete a la sección <strong>“Ayuda”</strong> y haz clic en <strong>“Danos tu opinión”</strong> para contactarnos. También puedes revisar las <strong>“Preguntas Frecuentes”</strong>.
        </p>
      </section>
    </div>
  );
}

export default AyudaManual;