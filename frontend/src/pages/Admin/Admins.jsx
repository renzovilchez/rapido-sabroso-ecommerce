import { useEffect, useState } from 'react';
import { apiAxios } from '../../services/api';

function Administradores() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await apiAxios.get('/admins');
      setAdmins(Array.isArray(res.data) ? res.data : [res.data]);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar administradores' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await apiAxios.post('/admins', formData);
      setMessage({ type: 'success', text: 'Administrador registrado' });
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch {
      setMessage({ type: 'error', text: 'Error al registrar' });
    }
  };

  const startEdit = (admin) => {
    setEditingId(admin.adminId);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiAxios.put(`/admins/${editingId}`, formData);
      setMessage({ type: 'success', text: 'Administrador actualizado' });
      cancelEdit();
      fetchAdmins();
    } catch {
      setMessage({ type: 'error', text: 'Error al actualizar' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este administrador?')) return;
    try {
      await apiAxios.delete(`/admins/${id}`);
      setMessage({ type: 'success', text: 'Administrador eliminado' });
      fetchAdmins();
    } catch {
      setMessage({ type: 'error', text: 'Error al eliminar' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Administradores</h1>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={editingId ? handleUpdate : handleCreate} className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Editar' : 'Registrar'} Administrador</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" className="border px-3 py-2 rounded" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2 rounded" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder={editingId ? 'Nueva contraseña (opcional)' : 'Contraseña'} className="border px-3 py-2 rounded" />
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
        <p className="text-center">Cargando administradores...</p>
      ) : (
        <table className="w-full border shadow text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Nombre</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.adminId} className="even:bg-gray-100">
                <td className="border px-4 py-2">{admin.name}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button onClick={() => startEdit(admin)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                  <button onClick={() => handleDelete(admin.adminId)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Administradores;