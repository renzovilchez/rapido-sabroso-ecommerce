import hoja1 from '../../assets/pdf/Tarjeta Vertical.pdf'
import hoja2 from '../../assets/pdf/tarjeta.pdf'

const hojasMembretadas = [
    {
        id: 1,
        titulo: 'Tarjeta Vertical',
        url: hoja1
    },

    {
        id: 2,
        titulo: 'Tarjeta Horizontal',
        url: hoja2
    },
];

function OtrosTarjetas() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tarjetas</h1>
            <div className="grid grid-cols-1 gap-10">
                {hojasMembretadas.map(hoja => (
                    <div key={hoja.id} className="border shadow-md rounded-lg p-4 bg-white">
                        <h2 className="text-xl font-semibold mb-4">{hoja.titulo}</h2>
                        <div className="w-full h-[600px]">
                            <iframe 
                                src={hoja.url} 
                                className="w-full h-full rounded"
                                title={hoja.titulo}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtrosTarjetas;