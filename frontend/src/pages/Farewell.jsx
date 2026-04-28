import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Despedida = () => {
  const [mensaje, setMensaje] = useState('');

  const frases = [
    '¡Pronto tendremos nuevos sabores para ti! 😋',
    '¿Ya viste todo nuestro catalogo? 🍝',
    '¡Gracias por apoyar lo casero y sabroso! ❤️',
  ];

  const mostrarSorpresa = () => {
    const aleatorio = frases[Math.floor(Math.random() * frases.length)];
    setMensaje(aleatorio);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-50 to-white flex flex-col justify-center items-center px-6 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4 drop-shadow-md">
        ¡Muchas gracias por su compra y por su visita! 🛍️
      </h1>

      <p className="text-lg md:text-xl text-yellow-800 mb-2 drop-shadow-sm">
        Esperamos pronto su nuevo pedido. Estamos aquí para atenderlo con el sabor de siempre. 🍽️
      </p>

      <button
        onClick={mostrarSorpresa}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-red-800 text-lg font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 animate-bounce"
      >
        🎉 Descubre algo más
      </button>

      {mensaje && (
        <p className="mt-6 text-lg text-red-700 font-semibold drop-shadow-sm">{mensaje}</p>
      )}

      <Link
        to="/home"
        className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-yellow-100 font-semibold py-2 px-6 rounded-lg shadow transition-all duration-300"
      >
        Volver al inicio
      </Link>

      {/* Contacto */}
      <div className="mt-12 text-sm text-yellow-900 text-center border-t border-yellow-300 pt-6 w-full max-w-md drop-shadow-sm">
        <h2 className="text-lg font-semibold text-red-700 mb-2">Contáctanos</h2>
        <p>📍 Av. América Sur 1391, Trujillo, La Libertad, Perú</p>
        <p className="mt-1">
          📞{' '}
          <a
            href="tel:+51978337741"
            className="text-yellow-600 hover:underline"
          >
            +51 978 337 741
          </a>
        </p>
        <p className="mt-1">
          🌐{' '}
          <a
            href="https://www.rapidoysabroso.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 hover:underline"
          >
            www.rapidoysabroso.com
          </a>
        </p>
        <p className="mt-1">
          ✉️{' '}
          <a
            href="mailto:contacto@rapidoysabroso.com"
            className="text-yellow-600 hover:underline"
          >
            contacto@rapidoysabroso.com
          </a>
        </p>
        <p className="mt-3 font-medium">Rápido y Sabroso</p>
        <p className="text-yellow-700">@RapidoySabroso</p>
      </div>
    </div>
  );
};

export default Despedida;