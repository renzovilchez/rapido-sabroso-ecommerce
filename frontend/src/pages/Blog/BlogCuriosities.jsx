import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";
import curiosidadesImage from "../../assets/images/curiosidades.jpg";

function BlogCuriosidades() {
  const relatedLinks = [
    { to: "/blog/novedades", label: "🔥 ¡Descubre las novedades más deliciosas del menú!", Component: Link },
    { to: "/blog/acompanamientos", label: "🍟 ¿Con qué acompañar tu hamburguesa?", Component: Link },
    { to: "/blog/beneficios", label: "👀 Beneficios de disfrutar una buena hamburguesa", Component: Link },
    { to: "/blog/historia", label: "📜 Historia de cómo surgió nuestro sueño llamado Rápido y Sabroso", Component: Link },
  ];

  return (
    <BlogLayout
      title="🍔 Datos Curiosos Sobre las Hamburguesas"
      subtitle="¡Todo lo que quieres saber del mundo de las hamburguesas!"
      image={curiosidadesImage}
      relatedLinks={relatedLinks}
    >

      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Curiosidades sobre el origen y la popularidad de las hamburguesas
        </h2>
        <p className="mb-6">
          La hamburguesa es uno de los platos más icónicos del mundo, pero ¿sabías que su historia está llena de sorpresas? Desde sus orígenes hasta convertirse en el favorito global, las hamburguesas tienen historias fascinantes.
        </p>

        <h3 className="text-xl font-bold mb-2">La hamburguesa más grande</h3>
        <p className="mb-4">
          En 2017, se cocinó la hamburguesa más grande del mundo, que pesaba más de 1,5 toneladas. ¡Imagina lo que se necesitaría para cocinar una hamburguesa de ese tamaño!
        </p>

        <h3 className="text-xl font-bold mb-2">Un pan poco común</h3>
        <p className="mb-4">
          Originalmente, el pan de hamburguesa no era redondo. Se usaban otros tipos de pan, pero la forma redonda se hizo popular por ser más fácil de manejar y comer.
        </p>

        <h3 className="text-xl font-bold mb-2">Inspiración alemana</h3>
        <p className="mb-4">
          La idea de la hamburguesa viene de los inmigrantes alemanes en los Estados Unidos. Trajeron consigo la costumbre de comer carne picada, y fue allí donde la carne molida se empezó a servir entre panes.
        </p>

        <h3 className="text-xl font-bold mb-2">Un fenómeno mundial</h3>
        <p className="mb-4">
          Hoy en día, las hamburguesas son el plato más popular en los Estados Unidos y se disfrutan en todo el mundo. Cada país tiene su propia versión, ¡y las combinaciones no tienen fin!
        </p>

        <h3 className="text-xl font-bold mb-2">Condimentos favoritos</h3>
        <p className="mb-4">
          Ketchup y mostaza son los condimentos que más se usan en las hamburguesas. Cada uno le da un sabor único, pero también hay muchas otras combinaciones para darle un toque personal.
        </p>

        <p className="mt-6 font-semibold">
          La hamburguesa es mucho más que solo comida, ¡es una tradición mundial llena de historia y sabor!<br /><br />
          Con pasión,<br />
          El equipo de <span className="font-bold">Rápido y Sabroso</span> 🍔🔥
        </p>
      </section>
    </BlogLayout>
  );
}

export default BlogCuriosidades;