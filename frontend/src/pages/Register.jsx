import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import fondoSilueta from '../assets/images/saturacion.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    tipoPersona: 'natural',
    documento: '',
    razonSocial: '',
    direccionFiscal: '',
    distrito: '',
    calle: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const direccionCompuesta = `Trujillo - ${formData.distrito} - ${formData.calle}`;

    const datosFinales = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.correo,
      password: formData.password,
      tipo_documento: formData.tipoPersona === 'natural' ? 'DNI' : 'RUC',
      dni: formData.tipoPersona === 'natural' ? formData.documento : null,
      ruc: formData.tipoPersona === 'juridica' ? formData.documento : null,
      razon_social: formData.tipoPersona === 'juridica' ? formData.razonSocial || null : null,
      direccion_fiscal: formData.tipoPersona === 'juridica' ? formData.direccionFiscal || null : null,
      direccion: `Trujillo - ${formData.distrito} - ${formData.calle}`
    };


    try {
      const response = await axios.post('http://localhost:5000/api/customers/register', datosFinales);
      navigate('/login');
    } catch (error) {
      const respuesta = error.response?.data;
      console.error("Error en el registro:", respuesta);

      if (respuesta?.detalle?.includes("Duplicate entry")) {
        const correoDuplicado = respuesta.detalle.split("'")[1];
        setError(`El correo ${correoDuplicado} ya está registrado.`);
      } else if (respuesta?.errores && typeof respuesta.errores === 'object') {
        const mensajes = Object.values(respuesta.errores).flat();
        setError(mensajes.join(" "));
      } else if (respuesta?.mensaje) {
        setError(respuesta.mensaje);
      } else {
        setError("Ocurrió un error al registrar. Intenta nuevamente.");
      }
    }

  };

  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      return 'El nombre es obligatorio';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      return 'El correo no es válido';
    }

    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.tipoPersona === 'natural' && !/^\d{8}$/.test(formData.documento)) {
      return 'El DNI debe tener 8 dígitos';
    }

    if (formData.tipoPersona === 'juridica' && !/^\d{11}$/.test(formData.documento)) {
      return 'El RUC debe tener 11 dígitos';
    }

    if (formData.tipoPersona === 'juridica') {
      if (!formData.razonSocial.trim()) return 'La razón social es obligatoria';
      if (!formData.direccionFiscal.trim()) return 'La dirección fiscal es obligatoria';
    }

    if (!formData.distrito.trim() || !formData.calle.trim()) {
      return 'La dirección de envío es obligatoria';
    }

    return null;
  };


  return (
    <div
      style={{ backgroundImage: `url(${fondoSilueta})`, backgroundSize: 'cover'}}
    >
      <div className="flex justify-center flex-col items-center"
      >
        <form
          onSubmit={handleRegister}
          className="backdrop-blur-md bg-white/30 border border-yellow-400/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-yellow-100 my-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Registro de Cliente</h2>

          {/* Nombre */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
              placeholder="Juan"
            />
          </div>

          {/* Apellidos */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
              placeholder="Pérez García"
            />
          </div>

          {/* Correo */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
              placeholder="••••••••"
            />
          </div>

          {/* Tipo de persona */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Tipo de persona</label>
            <select
              name="tipoPersona"
              value={formData.tipoPersona}
              onChange={handleChange}
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="natural" className='text-black'>Natural</option>
              <option value="juridica" className='text-black'>Jurídica</option>
            </select>
          </div>

          {/* Documento */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">
              {formData.tipoPersona === 'natural' ? 'DNI' : 'RUC'}
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={(e) => {
                const { value } = e.target;
                const maxLength = formData.tipoPersona === 'natural' ? 8 : 11;
                if (/^\d*$/.test(value) && value.length <= maxLength) {
                  setFormData((prev) => ({ ...prev, documento: value }));
                }
              }}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Razón Social y Dirección Fiscal */}
          {formData.tipoPersona === 'juridica' && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-sm text-yellow-200">Razón Social</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-yellow-200">Dirección Fiscal</label>
                <input
                  type="text"
                  name="direccionFiscal"
                  value={formData.direccionFiscal}
                  onChange={handleChange}
                  className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </>
          )}

          {/* Dirección de Envío - Distrito */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-yellow-200">Distrito</label>
            <select
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" className='text-black'>Selecciona un distrito</option>
              <option value="Trujillo" className='text-black'>Trujillo</option>
              <option value="La Esperanza" className='text-black'>La Esperanza</option>
              <option value="Florencia de Mora" className='text-black'>Florencia de Mora</option>
              <option value="El Porvenir" className='text-black'>El Porvenir</option>
              <option value="Huanchaco" className='text-black' >Huanchaco</option>
              <option value="Víctor Larco" className='text-black'>Víctor Larco</option>
              <option value="Laredo" className='text-black'>Laredo</option>
              <option value="Moche" className='text-black'>Moche</option>
              <option value="Salaverry" className='text-black'>Salaverry</option>
            </select>
          </div>

          {/* Dirección de Envío - Calle */}
          <div className="mb-6">
            <label className="block mb-1 text-sm text-yellow-200">Calle / Dirección exacta</label>
            <input
              type="text"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              required
              className="w-full p-2 bg-yellow-100/10 text-yellow-100 border border-yellow-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
              placeholder="Av. Principal 123"
            />
          </div>

          {/* Mostrar error si hay */}
          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition duration-300"
          >
            Registrarse
          </button>

          <p className="mt-4 text-center text-sm text-yellow-200">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-yellow-300 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </form>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-2 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
