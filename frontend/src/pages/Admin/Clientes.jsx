import React, { useEffect, useState } from 'react';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    tipo_documento: 'DNI',
    dni: '',
    direccion: '',
    puntos: '0.00'
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/clientes';

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setClientes(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al cargar clientes' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error al registrar cliente');
      setMessage({ type: 'success', text: 'Cliente registrado' });
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        tipo_documento: 'DNI',
        dni: '',
        direccion: '',
        puntos: '0.00'
      });
      fetchClientes();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const startEdit = (cliente) => {
    setEditingId(cliente.id_cliente);
    setFormData({
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      email: cliente.email,
      tipo_documento: cliente.tipo_documento || 'DNI',
      dni: cliente.dni || '',
      direccion: cliente.direccion || '',
      puntos: cliente.puntos || '0.00',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      nombre: '',
      apellidos: '',
      email: '',
      tipo_documento: 'DNI',
      dni: '',
      direccion: '',
      puntos: '0.00'
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error al actualizar cliente');
      setMessage({ type: 'success', text: 'Cliente actualizado' });
      cancelEdit();
      fetchClientes();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar cliente');
      setMessage({ type: 'success', text: 'Cliente eliminado' });
      fetchClientes();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes</h1>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={editingId ? handleUpdate : handleCreate} className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Editar Cliente' : 'Registrar Cliente'}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border px-3 py-2 rounded" />
          <input name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" className="border px-3 py-2 rounded" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="border px-3 py-2 rounded" />
          <select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} className="border px-3 py-2 rounded">
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
          <input
            name="dni"
            type="text"
            value={formData.dni}
            onChange={handleChange}
            placeholder="Número documento"
            maxLength="8"
            pattern="\d{8}"
            required
            className="border px-3 py-2 rounded"
          />          
          <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" className="border px-3 py-2 rounded" />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            {editingId ? 'Actualizar' : 'Registrar'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-center">Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <p className="text-center text-gray-600">No hay clientes registrados.</p>
      ) : (
        <table className="w-full border shadow text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Documento</th>
              <th className="border px-4 py-2 text-left">Dirección</th>
              <th className="border px-4 py-2 text-center">Puntos</th>
              <th className="border px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente} className="even:bg-gray-100">
                <td className="border px-4 py-2">{c.nombre} {c.apellidos}</td>
                <td className="border px-4 py-2">{c.email}</td>
                <td className="border px-4 py-2">{c.tipo_documento}: {c.dni || c.ruc}</td>
                <td className="border px-4 py-2">{c.direccion}</td>
                <td className="border px-4 py-2 text-center">{parseFloat(c.puntos).toFixed(2)}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button onClick={() => startEdit(c)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(c.id_cliente)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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

export default Clientes;