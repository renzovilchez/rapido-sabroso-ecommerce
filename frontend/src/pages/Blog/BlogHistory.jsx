import historiaImage from "../../assets/images/historia.jpg";
import { Link } from "react-router-dom";
import BlogLayout from "../../components/BlogLayout";

function BlogHistoria() {
  const relatedLinks = [
    { to: "/blog/novedades", label: "🔥 ¡Descubre las novedades más deliciosas del menú!", Component: Link },
    { to: "/blog/acompanamientos", label: "🍟 ¿Con qué acompañar tu hamburguesa?", Component: Link },
    { to: "/blog/beneficios", label: "👀 Beneficios de disfrutar una buena hamburguesa", Component: Link },
    { to: "/blog/curiosidades", label: "🍔 Datos curiosos sobre las hamburguesas", Component: Link },
  ];

  return (
    <BlogLayout
      title={`Historia de cómo surgió nuestro sueño llamado "Rápido y Sabroso"`}
      subtitle="Todo lo que quieres saber del mundo de las hamburguesas 🍔"
      image={historiaImage}
      relatedLinks={relatedLinks}
    >
      <h3 className="text-yellow-600">
        Nuestra Historia: De una Idea Casera a un Sabor que Conquista Trujillo
      </h3>
      <p>
        Todo comenzó con una conversación entre amigos en una cocina pequeña en Trujillo...
        [Aquí va el contenido real, como mencionaste].
      </p>

      <h4 className="text-gray-800">El inicio (2021 - 2022): cocinando en casa y repartiendo en moto</h4>
      <p>
        En pleno 2021, cuando la ciudad todavía se recuperaba del golpe de la pandemia...
      </p>

      <h4 className="text-gray-800">El primer local (2023): todo con esfuerzo, nada regalado</h4>
      <p>
        En 2023 dimos el salto: alquilamos un pequeño local en una esquina transitada de Trujillo...
      </p>

      <h4 className="text-gray-800">Innovar, crecer, escuchar (2024 en adelante)</h4>
      <p>
        Hoy, ya con un equipo más grande y más experiencia, seguimos con la misma filosofía...
      </p>

      <h4 className="text-gray-800">¿Por qué contamos esto?</h4>
      <p>
        Porque cada combo que vendemos tiene detrás una historia de esfuerzo...
      </p>

      <p>
        <strong>Esto recién empieza.</strong><br />
        Equipo de <strong>Rápido y Sabroso</strong> 🍔🔥
      </p>
    </BlogLayout>
  );
}

export default BlogHistoria;