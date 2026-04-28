import objetivoImagen from '../../assets/images/objetivoImagen.jpg';

function NosotrosObjetivos() {
  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>
      {/* Título principal */}
      <header className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Objetivos de "Rápido y Sabroso" E.I.R.L.
        </h1>
      </header>

      {/* Sección con fondo oscuro */}
      <section className="bg-neutral-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-yellow-500">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 text-center">
          Objetivos Empresariales
        </h2>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
          <div className="text-white text-lg leading-relaxed max-w-xl text-justify">
            <p>
              Los objetivos de <strong className="text-yellow-300">"Rápido y Sabroso" E.I.R.L.</strong> están enfocados en el <span className="text-yellow-200">crecimiento sostenible</span>, la <span className="text-yellow-200">satisfacción del cliente</span> y la <span className="text-yellow-200">expansión regional</span>.
            </p>
            <p className="mt-4">
              Nos hemos planteado metas claras para el <strong>corto</strong>, <strong>mediano</strong> y <strong>largo plazo</strong>:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>A corto plazo, aumentar las ventas mensuales en un 15%.</li>
              <li>A mediano plazo, abrir un segundo local en la ciudad o provincia cercana.</li>
              <li>A largo plazo, consolidar una presencia regional con al menos tres locales y mantener una satisfacción del cliente superior al 90%.</li>
            </ul>
            <p className="mt-4">
              Cada uno de estos objetivos refleja nuestro compromiso con la <span className="text-yellow-200">innovación constante</span> y la <span className="text-yellow-200">calidad en cada aspecto de nuestro servicio</span>.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={objetivoImagen}
              alt="Objetivos de la empresa"
              className="rounded-xl shadow-lg w-full object-cover max-h-96"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NosotrosObjetivos;