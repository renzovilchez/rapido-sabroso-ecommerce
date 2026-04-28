import acompanamientoImage from "../../assets/images/acompanamientos.jpg";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";

function BlogAcompanamientos() {
  const relatedLinks = [
    { to: "/blog/novedades", label: "🔥 ¡Descubre las novedades más deliciosas del menú!", Component: Link },
    { to: "/blog/historia", label: "📖 Historia de nuestro sueño llamado Rápido y Sabroso", Component: Link },
    { to: "/blog/beneficios", label: "👀 Beneficios de disfrutar una buena hamburguesa", Component: Link },
    { to: "/blog/curiosidades", label: "🍔 Datos curiosos sobre las hamburguesas", Component: Link },
  ];

  return (
    <BlogLayout
      title="🍟 ¿Con qué acompañar tu hamburguesa? 🥤"
      subtitle="¡Todo lo que quieres saber sobre el mundo de las hamburguesas!"
      image={acompanamientoImage}
      relatedLinks={relatedLinks}
    >
      <h2 className="text-3xl font-bold text-red-500 mb-6">Complementos que marcan la diferencia</h2>
      <p className="text-gray-700 mb-8">
        Una hamburguesa puede ser deliciosa por sí sola, pero lo que la acompaña puede convertirla en una{' '}
        <strong className="font-bold text-red-600">experiencia completa</strong>. Aquí te contamos nuestras mejores opciones para que cada mordida sea perfecta.
      </p>

      <section className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Papas clásicas: el favorito de todos 🍟</h3>
        <p className="text-gray-700">Las papas fritas doradas y crocantes son un clásico que nunca falla. Ya sean tradicionales, rústicas o en gajo, son el acompañamiento perfecto para cualquier hamburguesa.</p>
      </section>

      <section className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Cono de papas con queso cheddar 🧀</h3>
        <p className="text-gray-700">Si quieres algo más atrevido, prueba nuestras papas cubiertas con salsa de queso cheddar derretido. Un éxito total en nuestras promociones.</p>
      </section>

      <section className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Bebidas refrescantes 🧊</h3>
        <p className="text-gray-700">No hay nada como una bebida fría para equilibrar el sabor de una hamburguesa jugosa. Puedes elegir entre gaseosas, limonada natural o incluso jugos artesanales según tu preferencia.</p>
      </section>

      <section className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900">Snacks y extras 🍔</h3>
        <p className="text-gray-700">Aros de cebolla, bastones de camote, nuggets o hasta un mini hot dog para compartir. Porque a veces queremos más de una cosa rica a la vez.</p>
      </section>

      <section className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900">¿Algo más saludable? 🥗</h3>
        <p className="text-gray-700">También ofrecemos opciones como ensaladas frescas, chips de vegetales y agua saborizada para quienes buscan algo más ligero sin perder el sabor.</p>
      </section>

      <p className="text-gray-700 mb-6">Lo importante es que cada quien pueda armar su combo ideal. Tú eliges qué va mejor con tu hamburguesa favorita, nosotros nos encargamos de que todo sepa increíble.</p>

      <p className="font-semibold text-gray-800 mb-6">¡Prueba nuestras combinaciones y encuentra tu favorita!</p>

      <p className="text-gray-700 mb-6">
        Con cariño, <strong className="text-red-500 font-bold">Equipo de Rápido y Sabroso</strong> 🍔🔥
      </p>

      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-lg font-semibold text-gray-800">
          ¿Sabías que las papas fritas son el acompañamiento más popular de nuestras hamburguesas? ¡No puedes dejar de probarlas!
        </p>
      </div>
    </BlogLayout>
  );
}

export default BlogAcompanamientos;