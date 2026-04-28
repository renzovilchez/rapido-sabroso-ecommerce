import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import fondoSilueta from '../assets/images/saturacion.jpg';
const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { correo, password } = formData;

      const response = await axios.post('http://localhost:5000/api/customers/login', formData);

      if (response.data.success) {
        console.log('Login exitoso:', response.data.cliente);

        // Guarda el usuario en el localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.cliente));

        // Actualiza el estado de isLoggedIn en el contexto global
        setIsLoggedIn(true);

        // Redirige al usuario a la página de inicio
        navigate('/home');
      } else {
        setError('Correo o contraseña incorrectos');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error en el servidor o en la conexión');
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${fondoSilueta})` }}
    >
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-md bg-white/20 border border-yellow-400/20 p-8 rounded-2xl shadow-2xl w-full max-w-md text-yellow-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Iniciar Sesión</h2>

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
        <div className="mb-6">
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

        {/* Mostrar error si hay */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition duration-300"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-sm text-yellow-200">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-yellow-300 hover:underline">
            Dale clic aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
