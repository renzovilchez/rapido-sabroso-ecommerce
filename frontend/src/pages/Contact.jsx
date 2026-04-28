import GoogleMapIframe from '../components/GoogleMapIframe';
import RotatingCard from '../components/RotatingCard';
import AnthonyImage from '../assets/images/Anthony.jpg';
import KatterynImage from '../assets/images/Katteryn.jpg';
import RichardImage from '../assets/images/Richard.jpg';
import RenzoImage from '../assets/images/Renzo.jpg';
import { Mail, MapPin, Phone, Globe, Facebook, Video } from 'lucide-react';

const companyInfo = {
    name: 'Rápido y Sabroso E.I.R.L.',
    address: 'Av. América Sur 1391, Trujillo, La Libertad, Perú',
    phone: '+51 978 337 741',
    website: 'www.rapidoysabroso.com',
    facebook: 'Rapido y Sabroso',
    tiktok: '@RapidoySabroso',
    email: 'contacto@rapidoysabroso.com',
};

const cards = [
  {
    image: RenzoImage,
    title: 'Renzo Vilchez',
    role: 'Administrador del Proyecto',
    data: {
      lugarNacimiento: 'El Porvenir, Trujillo',
      fechaNacimiento: '29/06/2005',
      centroEstudios: 'Instituto Educativo Superior Tecnológico Público "Trujillo"',
      tecnologias: {
        disenoGrafico: ['Adobe Illustrator'],
        edicionVideo: ['Capcut'],
        desarrolloWeb: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Bootstrap', 'Node.js'],
      },
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'centroEstudios', 'tecnologias'],
  },
  {
    image: AnthonyImage,
    title: 'Anthony Herrera',
    role: 'Programador del Proyecto',
    data: {
      lugarNacimiento: 'Trujillo, Trujillo',
      fechaNacimiento: '01/11/1999',
      centroEstudios: 'Instituto Educativo Superior Tecnológico Público "Trujillo"',
      tecnologias: {
        disenoGrafico: ['Corel Draw', 'Adobe Illustrator', 'PhotoShop'],
        edicionVideo: ['Capcut'],
        desarrolloWeb: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap'],
      },
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'centroEstudios', 'tecnologias'],
  },
  {
    image: KatterynImage,
    title: 'Katteryn Pomaina',
    role: 'Diseñadora del Proyecto',
    data: {
      lugarNacimiento: 'La Esperanza, Trujillo',
      fechaNacimiento: '14/05/2006',
      centroEstudios: 'Instituto Educativo Superior Tecnológico Público "Trujillo"',
      tecnologias: {
        disenoGrafico: ['Corel DRAW', 'Adobe Illustrator', 'Adobe Photoshop'],
        edicionVideo: ['Capcut'],
        desarrolloWeb: ['HTML', 'CSS', 'React', 'PHP', 'Bootstrap'],
      },
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'centroEstudios', 'tecnologias'],
  },
  {
    image: RichardImage,
    title: 'Richard Terrones',
    role: 'Tester del Proyecto',
    data: {
      lugarNacimiento: 'Trujillo, Trujillo',
      fechaNacimiento: '13/10/2002',
      centroEstudios: 'Instituto Educativo Superior Tecnológico Público "Trujillo"',
      tecnologias: {
        disenoGrafico: ['Adobe Illustrator'],
        edicionVideo: ['Capcut'],
        desarrolloWeb: ['HTML', 'CSS', 'JavaScript'],
      },
    },
    showFields: ['lugarNacimiento', 'fechaNacimiento', 'centroEstudios', 'tecnologias'],
  },
];

function Contacto() {
    return (
        <div className='max-w-7xl m-auto mt-8 mb-8'>
            {/* Información de la empresa */}
            <section className="bg-[#0d1b2a] text-white p-6 md:p-10 rounded-3xl shadow-xl shadow-yellow-500 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mb-8">Contáctanos</h2>
                <div className="grid gap-6 md:grid-cols-2 text-lg leading-relaxed">
                    <div className="space-y-4">
                        <p className="flex items-center gap-2">
                            <MapPin className="text-yellow-300 w-5 h-5" /> {companyInfo.address}
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone className="text-yellow-300 w-5 h-5" /> {companyInfo.phone}
                        </p>
                        <p className="flex items-center gap-2">
                            <Globe className="text-yellow-300 w-5 h-5" />
                            <a href={`https://${companyInfo.website}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-200">
                                {companyInfo.website}
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <Mail className="text-yellow-300 w-5 h-5" /> {companyInfo.email}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="flex items-center gap-2">
                            <Facebook className="text-yellow-300 w-5 h-5" /> {companyInfo.facebook}
                        </p>
                        <p className="flex items-center gap-2">
                            <Video className="text-yellow-300 w-5 h-5" /> {companyInfo.tiktok}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mapa de ubicación */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-4">Estamos aquí:</h3>
                <div className="mt-4 max-w-[1000px] mx-auto">
                    <GoogleMapIframe />
                </div>
            </section>

            {/* Tarjetas del equipo */}
            <section>
                <h3 className="text-2xl font-bold text-center mb-6">Equipo de Desarrollo del Proyecto</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {cards.map((card, i) => (
                        <RotatingCard
                            key={i}
                            image={card.image}
                            title={card.title}
                            role={card.role}
                            data={card.data}
                            showFields={card.showFields}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Contacto;