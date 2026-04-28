import novedadesImage from "../../assets/images/novedades.jpg";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";

function BlogNovedades() {
  const relatedLinks = [
    { to: "/blog/historia", label: "📜 Historia de nuestro sueño llamado Rápido y Sabroso", Component: Link },
    { to: "/blog/acompanamientos", label: "🍟 ¿Con qué acompañar tu hamburguesa?", Component: Link },
    { to: "/blog/beneficios", label: "👀 Beneficios de disfrutar una buena hamburguesa", Component: Link },
    { to: "/blog/curiosidades", label: "🍔 Datos curiosos sobre las hamburguesas", Component: Link },
  ];

  return (
    <BlogLayout
      title="🔥 ¡Descubre las Novedades Más Deliciosas del Menú! 🔥"
      subtitle="¡Todo lo que quieres saber del mundo de las hamburguesas!"
      image={novedadesImage}
      relatedLinks={relatedLinks}
    >
      <h2 className="text-yellow-600 mb-6">Más sobre Hamburguesas</h2>
      <ul className="mb-12 space-y-3">
        <li>🍔 Nuestra nueva Hamburguesa “Volcán de Queso”</li>
        <li>🌶️ El regreso de la Doble Picante</li>
        <li>🍄 Opción Veggie con champiñones a la parrilla</li>
        <li>🧀 Combos con papas cheddar y bebida</li>
        <li>👨‍🍳 ¿Sabías que ahora puedes personalizar tu hamburguesa?</li>
      </ul>

      <section className="mb-12">
        <h3 className="text-gray-800 text-2xl font-semibold mb-4">Sabores Nuevos que Te Harán Repetir</h3>
        <p className="mb-6">
          Nos encanta innovar, y este mes lanzamos varias novedades pensadas para sorprenderte. Escuchamos lo que más te gusta
          y lo convertimos en nuevas combinaciones. ¡Prepárate para saborear algo único!
        </p>

        <h4 className="text-xl font-semibold mb-2">Hamburguesa “Volcán de Queso”</h4>
        <p className="mb-6">
          Una explosión de sabor. Con doble carne, relleno de queso derretido en el centro, tocino crocante y una salsa especial secreta que te dejará con ganas de más.
        </p>

        <h4 className="text-xl font-semibold mb-2">La Doble Picante: edición limitada</h4>
        <p className="mb-6">
          De regreso por tiempo limitado. Dos carnes, jalapeños frescos, cebolla crispy y nuestra famosa salsa picante artesanal. Solo para valientes.
        </p>

        <h4 className="text-xl font-semibold mb-2">Nueva opción vegetariana</h4>
        <p className="mb-6">
          Porque todos merecen disfrutar de algo sabroso. Ahora tenemos una opción veggie con champiñones salteados, pan integral y aderezo a base de yogur natural.
        </p>

        <h4 className="text-xl font-semibold mb-2">Combos mejorados</h4>
        <p className="mb-6">
          Incluyen nuevas papas con cheddar, crocantes y llenas de sabor, acompañadas de gaseosa o limonada natural. Perfecto para compartir o disfrutar solo.
        </p>

        <h4 className="text-xl font-semibold mb-2">Personaliza tu combo</h4>
        <p className="mb-6">
          Ahora puedes armar tu hamburguesa como quieras desde nuestra carta. Elige el tipo de pan, el tipo de carne, extras, salsas y acompañamientos.
        </p>

        <p className="font-bold">
          Sabemos que te gusta probar cosas nuevas, por eso seguimos trabajando para mejorar y traerte lo mejor en cada visita.
        </p>
      </section>

      <p className="text-lg mt-8">
        <strong>¡Ven y prueba nuestras novedades antes que se acaben!</strong><br />
        Con cariño,<br />
        El equipo de <strong>Rápido y Sabroso</strong> 🍔🔥
      </p>
    </BlogLayout>
  );
}

export default BlogNovedades;