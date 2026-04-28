import { useState } from 'react';
import logo1 from '../../assets/images/logos/logo-original.png';
import logo2 from '../../assets/images/logos/fondo-color.png';
import logo3 from '../../assets/images/logos/fondo-negro.png';
import logo4 from '../../assets/images/logos/fondo-invertido.png';
import logo5 from '../../assets/images/logos/mockup-1.png';
import logo6 from '../../assets/images/logos/mockup-2.png';
import logo7 from '../../assets/images/logos/mockup-3.png';

function OtrosLogos() {
  const [modalImage, setModalImage] = useState(null); // { src, alt }

  const logos = [
    { id: 1, src: logo1, alt: 'Logo Original' },
    { id: 2, src: logo2, alt: 'Logo Fondo Color' },
    { id: 3, src: logo3, alt: 'Logo Fondo Negro' },
    { id: 4, src: logo4, alt: 'Logo Fondo Invertido' },
    { id: 5, src: logo5, alt: 'Mockup 1' },
    { id: 6, src: logo6, alt: 'Mockup 2' },
    { id: 7, src: logo7, alt: 'Mockup 3' },
  ];

  const openModal = (logo) => {
    setModalImage(logo);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <section className="min-h-screen bg-[#FFF3E0] py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#212121] mb-8">Nuestros Logos</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="bg-white rounded-xl shadow-md flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openModal(logo)}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-40 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // evita que al hacer clic dentro se cierre
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 text-2xl font-bold hover:text-red-600"
            >
              &times;
            </button>
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default OtrosLogos;