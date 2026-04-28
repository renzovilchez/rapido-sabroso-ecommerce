import beneficioImage from '../../assets/images/beneficios.jpg';
import { Link } from 'react-router-dom';
import BlogLayout from '../../components/BlogLayout';

function BlogBeneficios() {
  const relatedLinks = [
    { to: "/blog/novedades", label: "🔥 ¡Descubre las novedades más deliciosas del menú!", Component: Link },
    { to: "/blog/acompanamientos", label: "🍟 ¿Con qué acompañar tu hamburguesa?", Component: Link },
    { to: "/blog/historia", label: "📜 Nuestra historia y cómo empezó todo", Component: Link },
    { to: "/blog/curiosidades", label: "🍔 Datos curiosos sobre las hamburguesas", Component: Link },
  ];

  return (
    <BlogLayout
      title="🍔 Beneficios de Disfrutar una Buena Hamburguesa"
      subtitle="¡Todo lo que quieres saber del mundo de las hamburguesas!"
      image={beneficioImage}
      relatedLinks={relatedLinks}
    >
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white bg-red-500 p-3 rounded-lg mb-4">
          Más que solo sabor: lo bueno de nuestras hamburguesas
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Sabemos que comer debe ser un momento especial, y si además trae beneficios, ¡mucho mejor! Nuestras hamburguesas están pensadas para darte una experiencia completa: sabor, energía y felicidad en cada bocado.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-white bg-red-500 p-3 rounded-lg mb-4">
          Comida rápida que alimenta bien
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Nuestras carnes son fuente de proteínas, los panes aportan energía, y los vegetales frescos como lechuga, tomate y cebolla suman vitaminas importantes. Todo eso en un solo plato.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-white bg-red-500 p-3 rounded-lg mb-4">
          Para el cuerpo... y también para el ánimo
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          ¿Has notado cómo una buena comida puede alegrarte el día? Comer algo que te gusta estimula hormonas como la serotonina. Así que sí, una hamburguesa bien hecha puede hacerte sentir mejor.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-white bg-red-500 p-3 rounded-lg mb-4">
          Calidad que se nota
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          En Rápido y Sabroso usamos ingredientes seleccionados para darte lo mejor en cada visita. Nada de comida sin sabor: aquí todo está hecho con cariño.
        </p>

        <h3 className="text-xl font-semibold mt-6 text-white bg-red-500 p-3 rounded-lg mb-4">
          Sin complicaciones
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Te atendemos rápido, con combos que ya incluyen todo lo que necesitas. Ideal para esos días de mucha hambre y poco tiempo. Ven, come bien y sigue con tu día sin estrés.
        </p>

        <p className="mt-6 text-lg font-semibold text-gray-800">
          Comer rico también puede ser parte de una vida equilibrada. ¡Nosotros nos encargamos del sabor!
          <div className="mt-4 text-gray-700">Con cariño, Equipo de Rápido y Sabroso 🍔🔥</div>
        </p>
      </section>
    </BlogLayout>
  );
}

export default BlogBeneficios;