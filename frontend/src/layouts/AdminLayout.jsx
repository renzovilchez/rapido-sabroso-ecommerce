import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, BarChart2, Users, Tag, Layers, Package, User, ShoppingCart, FileText, Settings } from 'lucide-react';

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
  { to: '/admin/productos', label: 'Productos', icon: <ShoppingCart size={18} /> },
  { to: '/admin/categoriasProductos', label: 'Categorías de productos', icon: <Tag size={18} /> },
  { to: '/admin/tiposProductos', label: 'Tipos de productos', icon: <Layers size={18} /> },
  { to: '/admin/pedidos', label: 'Pedidos', icon: <Package size={18} /> },
  { to: '/admin/clientes', label: 'Clientes', icon: <User size={18} /> },
  { to: '/admin/Admins', label: 'Administradores', icon: <Users size={18} /> },
  { to: '/admin/reportes', label: 'Reportes', icon: <FileText size={18} /> },
  { to: '/admin/ajustes', label: 'Ajustes', icon: <Settings size={18} /> },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-white shadow-md p-4 z-50 md:block">
        <h2 className="text-2xl font-bold text-yellow-600 mb-8 text-center">Panel de Administración</h2>
        <nav className="space-y-4">
          {adminNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold ${
                location.pathname.startsWith(item.to)
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t pt-6">
          <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-700">
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}