import { Link } from 'react-router-dom';

function Ayuda() {
    return (
        <div className='max-w-4xl m-auto mt-8 mb-8'>
            <h1 className="text-3xl font-bold text-center mb-6">Centro de Ayuda</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Información de la Empresa</h2>
                <div className="space-y-1 text-gray-700">
                    <p><span className="font-medium">Nombre:</span> Rápido y Sabroso E.I.R.L.</p>
                    <p><span className="font-medium">RUC:</span> 20345678901</p>
                    <p><span className="font-medium">Dirección:</span> Av. América Sur 1391, Trujillo, La Libertad, Perú</p>
                    <p><span className="font-medium">Correo de contacto:</span> contacto@rapidoysabroso.com</p>
                    <p><span className="font-medium">Teléfono:</span> +51 987 654 321</p>
                    <p><span className="font-medium">Horario de atención:</span> Lunes a Domingo, 10:00 AM - 11:00 PM</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Políticas de la Empresa</h2>
                <div className="space-y-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold mb-1">Política de Calidad</h3>
                        <p>
                            En Rápido y Sabroso nos comprometemos a ofrecer productos frescos y de la más alta calidad,
                            elaborados con ingredientes seleccionados para brindar una experiencia deliciosa y segura.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Política de Entrega</h3>
                        <p>
                            Nos esforzamos para que tus pedidos lleguen en el menor tiempo posible. El tiempo estimado de
                            entrega es de 30 a 45 minutos. Si hay algún retraso, nuestro equipo se comunicará contigo.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Política de Devoluciones y Reembolsos</h3>
                        <p>
                            Si recibes un producto en mal estado o incorrecto, por favor contáctanos dentro de las primeras 2 horas
                            para gestionar la devolución o el reembolso. Nuestro objetivo es tu completa satisfacción.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Política de Privacidad</h3>
                        <p>
                            Respetamos tu privacidad y manejamos tus datos personales con confidencialidad, usándolos únicamente para
                            procesar tus pedidos y mejorar nuestros servicios. No compartimos tu información con terceros sin tu consentimiento.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">¿En qué podemos ayudarte?</h2>
                <ul className="space-y-3">
                    <li>
                        <Link
                            to="/ayuda/manual-usuario"
                            className="block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded shadow transition"
                        >
                            📘 Manual de Usuario
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/ayuda/preguntas-frecuentes"
                            className="block bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded shadow transition"
                        >
                            💬 Preguntas Frecuentes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/ayuda/preguntas-frecuentes"
                            className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded shadow transition"
                        >
                            🗣️ Danos tu Opinión
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default Ayuda;