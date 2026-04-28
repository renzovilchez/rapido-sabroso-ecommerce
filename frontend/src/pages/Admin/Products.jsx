import React, { useEffect, useState } from 'react';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [tiposProducto, setTiposProducto] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: '',
        tipoProductoId: '',
    });

    const API_PRODUCTOS = 'http://localhost:5000/api/products';
    const API_TIPOS = 'http://localhost:5000/api/product-types';
    const API_CATEGORIAS = 'http://localhost:5000/api/categories';

    // Cargar productos
    const fetchProductos = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_PRODUCTOS);
            const data = await res.json();
            setProductos(Array.isArray(data) ? data : []);
            setError(null);
        } catch {
            setError('Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    // Cargar tipos y categorias
    const fetchTiposYCategorias = async () => {
        try {
            const [tiposRes, categoriasRes] = await Promise.all([
                fetch(API_TIPOS),
                fetch(API_CATEGORIAS)
            ]);
            const tiposData = await tiposRes.json();
            const categoriasData = await categoriasRes.json();
            setTiposProducto(Array.isArray(tiposData) ? tiposData : []);
            setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
        } catch {
            // Podrías agregar manejo de errores si quieres
        }
    };

    useEffect(() => {
        fetchProductos();
        fetchTiposYCategorias();
    }, []);

    const [categoriaRelacionada, setCategoriaRelacionada] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'tipoProductoId') {
            const tipo = tiposProducto.find(t => t.id_tipo_producto === Number(value));
            if (tipo) {
                const categoria = categorias.find(c => c.id_categoria === tipo.id_categoria);
                setCategoriaRelacionada(categoria ? categoria.nombre : '');
            } else {
                setCategoriaRelacionada('');
            }
        }
    };

    // En resetForm, limpiar categoría relacionada también
    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            imagen: '',
            tipoProductoId: '',
        });
        setCategoriaRelacionada('');
        setEditingId(null);
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones básicas
        if (
            !formData.nombre.trim() ||
            !formData.precio ||
            !formData.stock ||
            !formData.tipoProductoId ||
            !formData.categoriaProductoId
        ) {
            setMessage({ type: 'error', text: 'Completa todos los campos obligatorios.' });
            return;
        }

        const tipoSeleccionado = tiposProducto.find(t => t.id_tipo_producto === Number(formData.tipoProductoId));
        const categoria = categorias.find(c => c.id_categoria === tipoSeleccionado?.id_categoria);

        const payload = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            stock: parseInt(formData.stock, 10),
            imagen: formData.imagen,
            tipoProducto: tipoSeleccionado?.nombre || '',
            categoriaProducto: categoria?.nombre || '',
        };


        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `${API_PRODUCTOS}/${editingId}` : API_PRODUCTOS;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Error al guardar el producto');

            setMessage({ type: 'success', text: `Producto ${editingId ? 'actualizado' : 'creado'} correctamente.` });
            resetForm();
            fetchProductos();
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    const startEdit = (prod) => {
        const tipo = tiposProducto.find(t => t.nombre === prod.tipoProducto);
        setEditingId(prod.id_producto);
        setFormData({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            precio: prod.precio,
            stock: prod.stock,
            imagen: prod.imagen,
            tipoProductoId: tipo ? String(tipo.id_tipo_producto) : '',
        });

        if (tipo) {
            const categoria = categorias.find(c => c.id_categoria === tipo.id_categoria);
            setCategoriaRelacionada(categoria ? categoria.nombre : '');
        } else {
            setCategoriaRelacionada('');
        }

        setMessage(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar este producto?')) return;
        try {
            const res = await fetch(`${API_PRODUCTOS}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error al eliminar');
            setMessage({ type: 'success', text: 'Producto eliminado' });
            fetchProductos();
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        }
    };

    // Funciones para mostrar nombres desde ids
    const nombreTipo = (id) => tiposProducto.find(t => t.id_tipo_producto === id)?.nombre || '';
    const nombreCategoria = (id) => categorias.find(c => c.id_categoria === id)?.nombre || '';

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Administrar Productos</h1>

            {message && (
                <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {message.text}
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Editar Producto' : 'Crear Producto'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        name="precio"
                        type="number"
                        step="0.01"
                        placeholder="Precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="1"
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        name="imagen"
                        placeholder="Nombre de imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded"
                    />

                    {/* Select Tipo Producto */}
                    <select
                        name="tipoProductoId"
                        value={formData.tipoProductoId}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">Seleccione Tipo de Producto</option>
                        {tiposProducto.map(tipo => (
                            <option key={tipo.id_tipo_producto} value={tipo.id_tipo_producto}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>

                    {/* Campo categoría solo lectura */}
                    <input
                        type="text"
                        value={categoriaRelacionada}
                        readOnly
                        placeholder="Categoría"
                        className="border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                    />

                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded md:col-span-2"
                    />
                </div>
                <div className="mt-4 flex gap-2">
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Tabla de productos */}
            {loading ? (
                <p className="text-center">Cargando productos...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : productos.length === 0 ? (
                <p className="text-center text-gray-600">No hay productos registrados.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border text-sm text-left">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="px-4 py-2 border">Nombre</th>
                                <th className="px-4 py-2 border">Descripción</th>
                                <th className="px-4 py-2 border">Precio</th>
                                <th className="px-4 py-2 border">Stock</th>
                                <th className="px-4 py-2 border">Tipo</th>
                                <th className="px-4 py-2 border">Categoría</th>
                                <th className="px-4 py-2 border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => {
                                // Obtener ids para mostrar nombre desde tipos y categorias
                                const tipo = tiposProducto.find(t => t.nombre === prod.tipoProducto);
                                const categoria = categorias.find(c => c.nombre === prod.categoriaProducto);

                                return (
                                    <tr key={prod.id_producto} className="even:bg-gray-100 hover:bg-gray-200">
                                        <td className="px-4 py-2 border">{prod.nombre}</td>
                                        <td className="px-4 py-2 border">{prod.descripcion}</td>
                                        <td className="px-4 py-2 border">S/ {parseFloat(prod.precio).toFixed(2)}</td>
                                        <td className="px-4 py-2 border">{prod.stock}</td>
                                        <td className="px-4 py-2 border">{tipo ? tipo.nombre : prod.tipoProducto}</td>
                                        <td className="px-4 py-2 border">{categoria ? categoria.nombre : prod.categoriaProducto}</td>
                                        <td className="px-4 py-2 border space-x-2 text-center">
                                            <button
                                                onClick={() => startEdit(prod)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prod.id_producto)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Productos;
