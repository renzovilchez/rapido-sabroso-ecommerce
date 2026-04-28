import React, { useEffect, useState } from 'react';

function CategoriasProductos() {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({ nombre: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api/categories';

  // Obtener categorías
  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/con-tipos/all`); // usa la ruta especial
      if (!res.ok) throw new Error('Error al cargar las categorías');
      const data = await res.json();
      setCategorias(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Cambios en el input
  const handleChange = (e) => {
    setFormData({ ...formData, nombre: e.target.value });
  };

  // Crear nueva categoría
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setMessage({ type: 'error', text: 'El nombre es obligatorio' });
      return;
    }
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error al crear categoría');
      setFormData({ nombre: '' });
      setMessage({ type: 'success', text: 'Categoría creada' });
      fetchCategorias();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  // Editar
  const startEdit = (categoria) => {
    setEditingId(categoria._id);
    setFormData({ nombre: categoria.nombre });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ nombre: '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error al actualizar categoría');
      setMessage({ type: 'success', text: 'Categoría actualizada' });
      setEditingId(null);
      setFormData({ nombre: '' });
      fetchCategorias();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar categoría');
      setMessage({ type: 'success', text: 'Categoría eliminada' });
      fetchCategorias();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Categorías de Productos</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="mb-6 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Editar Categoría' : 'Crear Nueva Categoría'}
        </h2>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full mb-4 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nombre de la categoría"
        />
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
              onClick={cancelEdit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de categorías */}
      {loading ? (
        <p className="text-center">Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <p className="text-center text-gray-600">No hay categorías registradas.</p>
      ) : (
        <table className="w-full table-auto border-collapse shadow rounded">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Tipos Asociados</th>
              <th className="border px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat._id} className="even:bg-gray-100 hover:bg-gray-200 transition">
                <td className="border px-4 py-2">{cat.nombre}</td>
                <td className="border px-4 py-2">
                  {cat.tipos && cat.tipos.length > 0
                    ? cat.tipos.map((tipo) => tipo.nombre).join(', ')
                    : '—'}
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

export default CategoriasProductos;
