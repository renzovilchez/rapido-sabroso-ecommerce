import React, { useEffect, useState } from 'react';

function TiposProductos() {
  const [tipos, setTipos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    imagen: '',
    id_categoria: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const TIPOS_URL = 'http://localhost:5000/api/product-types';
  const CATS_URL = 'http://localhost:5000/api/categories';

  // Carga inicial de tipos y categorías
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resT, resC] = await Promise.all([
        fetch(TIPOS_URL),
        fetch(CATS_URL),
      ]);
      if (!resT.ok || !resC.ok)
        throw new Error('Error al cargar datos');
      const [dataT, dataC] = await Promise.all([
        resT.json(),
        resC.json(),
      ]);
      setTipos(dataT);
      setCategorias(dataC);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: '', imagen: '', id_categoria: '' });
    setEditingId(null);
  };

  const sendRequest = async (method) => {
    const url = editingId ? `${TIPOS_URL}/${editingId}` : TIPOS_URL;
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Error al ${method === 'POST' ? 'crear' : 'actualizar'}`);
      setMessage({
        type: 'success',
        text: method === 'POST'
          ? 'Tipo creado correctamente'
          : 'Tipo actualizado',
      });
      resetForm();
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.imagen.trim() || !formData.id_categoria) {
      setMessage({ type: 'error', text: 'Completa todos los campos' });
      return;
    }
    sendRequest(editingId ? 'PUT' : 'POST');
  };

  const startEdit = (tipo) => {
    setEditingId(tipo.id_tipo_producto);
    setFormData({
      nombre: tipo.nombre,
      imagen: tipo.imagen,
      id_categoria: tipo.id_categoria.toString(),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este tipo de producto?')) return;
    try {
      const res = await fetch(`${TIPOS_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar');
      setMessage({ type: 'success', text: 'Tipo eliminado' });
      fetchData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tipos de Productos</h1>

      {message && (
        <div className={`
          mb-4 p-3 rounded ${
            message.type === 'error'
              ? 'bg-red-200 text-red-800'
              : 'bg-green-200 text-green-800'
          }`}>
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Tipo' : 'Crear Nuevo Tipo'}
        </h2>

        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full mb-4 border px-3 py-2 rounded"
        />
        <input
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="Nombre de archivo de imagen"
          className="w-full mb-4 border px-3 py-2 rounded"
        />

        <select
          name="id_categoria"
          value={formData.id_categoria}
          onChange={handleChange}
          className="w-full mb-4 border px-3 py-2 rounded"
        >
          <option value="">Selecciona categoría</option>
          {categorias.map(cat => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : tipos.length === 0 ? (
        <p className="text-center text-gray-600">No hay tipos registrados.</p>
      ) : (
        <table className="w-full table-auto border-collapse shadow rounded">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Imagen</th>
              <th className="border px-4 py-2">Categoría</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map(t => (
              <tr key={t.id_tipo_producto} className="even:bg-gray-100 hover:bg-gray-200">
                <td className="border px-4 py-2">{t.id_tipo_producto}</td>
                <td className="border px-4 py-2">{t.nombre}</td>
                <td className="border px-4 py-2">{t.imagen}</td>
                <td className="border px-4 py-2">
                  {categorias.find(c => c.id_categoria === t.id_categoria)?.nombre || '-'}
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id_tipo_producto)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TiposProductos;
