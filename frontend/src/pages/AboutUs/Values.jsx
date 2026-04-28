import valoresImagen from '../../assets/images/valoresImagen.jpg';

function NosotrosValores() {
  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>
      {/* Título */}
      <header className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Valores de "Rápido y Sabroso" E.I.R.L.
        </h1>
      </header>

      {/* Sección principal con fondo oscuro */}
      <section className="bg-neutral-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-yellow-500">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 text-center">
          Nuestros Valores
        </h2>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
          <div className="text-white text-lg leading-relaxed max-w-xl text-justify">
            <p>
              En <strong className="text-yellow-300">Rápido y Sabroso E.I.R.L.</strong>, creemos en principios sólidos que guían nuestras acciones y reflejan nuestra identidad como empresa.
            </p>

            <ul className="list-disc list-inside mt-6 space-y-3">
              <li><strong>Innovación:</strong> Buscamos nuevas formas de mejorar y sorprender.</li>
              <li><strong>Compromiso:</strong> Nos dedicamos a ofrecer calidad en todo momento.</li>
              <li><strong>Trabajo en equipo:</strong> Valoramos la colaboración y el respeto mutuo.</li>
              <li><strong>Responsabilidad:</strong> Actuamos con integridad y conciencia social.</li>
              <li><strong>Transparencia:</strong> Comunicamos con honestidad y claridad.</li>
            </ul>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={valoresImagen}
              alt="Nuestros valores"
              className="rounded-xl shadow-lg w-full object-cover max-h-96"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NosotrosValores;