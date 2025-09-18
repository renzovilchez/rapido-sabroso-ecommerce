import { Link } from 'react-router-dom';

function Index() {

    const opciones = [
        { label: 'Diseño de Boleta', path: '/otros/boleta' },
        { label: 'Diseño de Factura', path: '/otros/factura' },
        { label: 'Diseño de Hojas membretadas', path: '/otros/hojas-membretadas' },
        { label: 'Logos', path: '/otros/logos' },
        { label: 'Tarjetas', path: '/otros/tarjetas' },
    ];

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-yellow-600">Otros</h1>
            <div className="grid gap-4">
                {opciones.map((opcion) => (
                    <Link
                        key={opcion.path}
                        to={opcion.path}
                        className="block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-2xl text-center shadow transition-transform hover:scale-105"
                    >
                        {opcion.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Index