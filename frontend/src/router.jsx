import { Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

// Landing Pages
import LandingPage from "./pages/LandingPage/LandingPage";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import ProductCategories from "./pages/Admin/ProductCategories";
import ProductTypes from "./pages/Admin/ProductTypes";
import Orders from "./pages/Admin/Orders";
import Customers from "./pages/Admin/Customers";
import Admins from "./pages/Admin/Admins";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";
import LoginAdmin from "./pages/Admin/LoginAdmin";

// Customer Pages
import Home from "./pages/Home";
// Blog
import Blog from "./pages/Blog/index";
import BlogHistory from "./pages/Blog/BlogHistory";
import BlogSides from "./pages/Blog/BlogSides";
import BlogBenefits from "./pages/Blog/BlogBenefits";
import BlogCuriosities from "./pages/Blog/BlogCuriosities";
import BlogNews from "./pages/Blog/BlogNews";
// Vlog
import Vlog from "./pages/Vlog";
// Contact
import Contact from "./pages/Contact";
// Receipt
import Receipt from "./pages/Receipt";
// About Us
import AboutUs from "./pages/AboutUs/index";
import Mission from "./pages/AboutUs/Mission";
import Vision from "./pages/AboutUs/Vision";
import Objectives from "./pages/AboutUs/Objectives";
import Values from "./pages/AboutUs/Values";
// Help
import Help from "./pages/Help/index";
import UserManual from "./pages/Help/UserManual";
import GiveOpinion from "./pages/Help/GiveOpinion";
import Faq from "./pages/Help/Faq";
// Cart
import Cart from "./pages/Cart";
// Others
import Others from "./pages/Others/index";
import ReceiptFactura from "./pages/Others/ReceiptFactura";
import ReceiptBoleta from "./pages/Others/ReceiptBoleta";
import Letterheads from "./pages/Others/Letterheads";
import Videos from "./pages/Others/Videos";
import Cards from "./pages/Others/Cards";
import Logos from "./pages/Others/Logos";
// Payment
import Payment from "./pages/Payment";
// Login
import Login from "./pages/Login";
// Register
import Register from "./pages/Register";
// NotFound
import NotFound from "./pages/NotFound";
// Menu
import MenuIndex from "./pages/Menu/MenuIndex";
import CategoryDetail from "./pages/Menu/CategoryDetail";
import ComboCategory from "./pages/Menu/ComboCategory";
import ProductList from "./pages/Menu/ProductList";
// Order History
import OrderHistory from "./pages/OrderHistory";
// Farewell
import Farewell from "./pages/Farewell";

export function Router() {
  return (
    <Routes>
      {/* Landing outside layout */}
      <Route path="/" element={<LandingPage />} />

      {/* Admin Routes with AdminLayout */}
      <Route path="/admin/" element={<LoginAdmin />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/productos" element={<Products />} />
        <Route
          path="/admin/categoriasProductos"
          element={<ProductCategories />}
        />
        <Route path="/admin/tiposProductos" element={<ProductTypes />} />
        <Route path="/admin/pedidos" element={<Orders />} />
        <Route path="/admin/clientes" element={<Customers />} />
        <Route path="/admin/Admins" element={<Admins />} />
        <Route path="/admin/reportes" element={<Reports />} />
        <Route path="/admin/ajustes" element={<Settings />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>

      {/* Customer Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/carta" element={<MenuIndex />} />
        <Route path="/carta/combo/:tipo" element={<ComboCategory />} />
        <Route path="/carta/:tipo" element={<CategoryDetail />} />
        <Route path="/carta/producto/:slug" element={<ProductList />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/historia" element={<BlogHistory />} />
        <Route path="/blog/acompanamientos" element={<BlogSides />} />
        <Route path="/blog/beneficios" element={<BlogBenefits />} />
        <Route path="/blog/curiosidades" element={<BlogCuriosities />} />
        <Route path="/blog/novedades" element={<BlogNews />} />

        <Route path="/vlog" element={<Vlog />} />

        <Route path="/contacto" element={<Contact />} />

        <Route path="/nosotros/" element={<AboutUs />} />
        <Route path="/nosotros/mision" element={<Mission />} />
        <Route path="/nosotros/vision" element={<Vision />} />
        <Route path="/nosotros/objetivos" element={<Objectives />} />
        <Route path="/nosotros/valores" element={<Values />} />

        <Route path="/ayuda/" element={<Help />} />
        <Route path="/ayuda/manual-usuario" element={<UserManual />} />
        <Route path="/ayuda/danos-tu-opinion" element={<GiveOpinion />} />
        <Route
          path="/ayuda/preguntas-frecuentes"
          element={<Faq />}
        />

        <Route path="/carrito" element={<Cart />} />

        <Route path="/historial-pedidos" element={<OrderHistory />} />

        <Route path="/otros" element={<Others />} />
        <Route path="/otros/factura" element={<ReceiptFactura />} />
        <Route path="/otros/boleta" element={<ReceiptBoleta />} />
        <Route
          path="/otros/hojas-membretadas"
          element={<Letterheads />}
        />
        <Route path="/otros/videos" element={<Videos />} />
        <Route path="/otros/tarjetas" element={<Cards />} />
        <Route path="/otros/logos" element={<Logos />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/pago" element={<Payment />} />
        <Route path="/comprobante/:idPedido" element={<Receipt />} />

        <Route path="/despedida" element={<Farewell />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
