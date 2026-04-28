import visionImage from '../../assets/images/visionImagen.jpg';

function NosotrosVision() {
  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>
      {/* Título */}
      <header className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Visión de "Rápido y Sabroso" E.I.R.L.
        </h1>
      </header>

      {/* Sección principal con fondo oscuro */}
      <section className="bg-neutral-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-yellow-500">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 text-center">
          Nuestra Visión
        </h2>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
          <div className="text-white text-lg leading-relaxed max-w-xl text-justify w-full">
            <p className='w-md m-auto'>
              En <strong className="text-yellow-300">Rápido y Sabroso E.I.R.L.</strong>, aspiramos a ser la cadena de comida rápida más reconocida y valorada de la región, ofreciendo productos de calidad excepcional que combinan sabor, innovación y sostenibilidad.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={visionImage}
              alt="Nuestra visión"
              className="rounded-xl shadow-lg w-full object-cover max-h-96"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NosotrosVision;