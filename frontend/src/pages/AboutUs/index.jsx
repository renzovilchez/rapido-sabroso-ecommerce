import { Link } from 'react-router-dom';
import { Target, Eye, ListChecks, HeartHandshake } from 'lucide-react';
import RotatingCard from '../../components/RotatingCard';
import CarlosImage from '../../assets/images/CarlosMendoza.jfif';
import MarianaImage from '../../assets/images/MarianaTorres.jfif';
import LuisImage from '../../assets/images/LuisRamirez.jfif';
import SofiaImage from '../../assets/images/SofiaDelgado.jfif';

const sections = [
  { path: 'mision', label: 'Misión', icon: <Target className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'vision', label: 'Visión', icon: <Eye className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'objetivos', label: 'Objetivos', icon: <ListChecks className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'valores', label: 'Valores', icon: <HeartHandshake className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
];

const equipo = [
  {
    image: CarlosImage,
    title: 'Carlos Mendoza',
    role: 'Gerente General',
    data: {
      lugarNacimiento: 'Lima, Perú',
      fechaNacimiento: '12/03/1985',
      añosExperiencia: '10 años en gestión de restaurantes',
      formación: 'Administración de Empresas - Universidad de Lima',
      habilidadesClave: ['Liderazgo', 'Toma de decisiones', 'Estrategia empresarial'],
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'añosExperiencia', 'formación', 'habilidadesClave'],
  },
  {
    image: MarianaImage,
    title: 'Mariana Torres',
    role: 'Jefa de Cocina',
    data: {
      lugarNacimiento: 'Arequipa, Perú',
      fechaNacimiento: '25/07/1990',
      añosExperiencia: '8 años en cocina de comida rápida',
      formación: 'Gastronomía - Instituto Gastronómico Peruano',
      especialidades: ['Hamburguesas gourmet', 'Control de calidad de alimentos', 'Manejo de personal de cocina'],
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'añosExperiencia', 'formación', 'especialidades'],
  },
  {
    image: LuisImage,
    title: 'Luis Ramírez',
    role: 'Encargado de Marketing',
    data: {
      lugarNacimiento: 'Trujillo, Perú',
      fechaNacimiento: '18/11/1992',
      añosExperiencia: '5 años en marketing digital',
      formación: 'Comunicación y Marketing - Universidad Nacional de Trujillo',
      habilidadesClave: ['Campañas en redes sociales', 'Análisis de mercado', 'Creatividad publicitaria'],
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'añosExperiencia', 'formación', 'habilidadesClave'],
  },
  {
    image: SofiaImage,
    title: 'Sofía Delgado',
    role: 'Responsable de Logística',
    data: {
      lugarNacimiento: 'Cusco, Perú',
      fechaNacimiento: '09/06/1988',
      añosExperiencia: '7 años en logística y distribución',
      formación: 'Ingeniería Industrial - Universidad Nacional de San Agustín',
      habilidadesClave: ['Gestión de inventarios', 'Coordinación de proveedores', 'Optimización de rutas de entrega'],
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'añosExperiencia', 'formación', 'habilidadesClave'],
  },
];

function Nosotros() {
  return (
    <div className='max-w-7xl m-auto mt-8 mb-8'>

        {/* 🎬 Header con animación única */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 z-10"
        >
          <h2 className="text-4xl font-bold text-yellow-600">Nosotros</h2>
          <p className="mt-4 text-lg font-medium text-gray-800 max-w-2xl">
            Conoce más sobre quiénes somos, nuestra misión, visión, objetivos y valores.
          </p>
        </motion.header>

        {/* 🃏 Tarjetas animadas al hacer scroll */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16 px-4">
          {sections.map(({ path, label, icon }, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="w-full"
            >
              <Link
                to={`/nosotros/${path}`}
                className="block w-full bg-[#FDD835] text-[#5C3D2E] p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 hover:bg-[#A67C52] hover:text-white transition duration-300"
              >
                {icon}
                <h3 className="text-xl font-semibold">{label}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 📜 Texto final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center z-10"
        >
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            En <strong className="text-[#5C3D2E]">Rápido y Sabroso</strong>, trabajamos con pasión y compromiso
            para ofrecerte lo mejor de la comida rápida. Descubre qué nos motiva y por qué somos tu mejor opción.
          </p>
        </motion.div>

        {/* 👥 Personal Ficticio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-yellow-600 text-center mb-10">Nuestro Equipo</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {equipo.map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <RotatingCard
                  key={i}
                  image={persona.image}
                  title={persona.title}
                  role={persona.role}
                  data={persona.data}
                  showFields={persona.showFields}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
  );
}

export default Nosotros;