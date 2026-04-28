import misionImage from '../../assets/images/misionImagen.jpg';

function NosotrosMision() {
  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>
      <header className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-600 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          Misión de "Rápido y Sabroso" E.I.R.L.
        </h1>
      </header>

      <section className="bg-neutral-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-yellow-500 mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6 text-center">
          Nuestra Misión
        </h2>

        <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
          <div className="text-white text-lg leading-relaxed max-w-xl text-justify w-full">
            <p className='w-md m-auto'>
              La misión de <strong className="text-yellow-300">Rápido y Sabroso E.I.R.L.</strong> es brindar comida rápida de calidad con sabor casero,
              a precios accesibles. Buscamos ofrecer atención rápida, amable y un ambiente acogedor para todos nuestros clientes que consuman en nuestro local.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={misionImage}
              alt="Nuestra misión"
              className="rounded-xl shadow-lg w-full object-cover max-h-96"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NosotrosMision;
