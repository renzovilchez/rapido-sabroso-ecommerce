import hoja1 from '../../assets/pdf/hojas Membretadas.pdf'

const hojasMembretadas = [
    {
        id: 1,
        titulo: 'Hojas Membretada',
        url: hoja1
    },
];

function OtrosHojasMembretadas() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Hojas Membretadas</h1>
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

export default OtrosHojasMembretadas;