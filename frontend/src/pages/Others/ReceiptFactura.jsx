import facturaImg from '../../assets/images/factura.png';

function OtrosFactura() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Diseño de Factura</h1>
            <img 
                src={facturaImg} 
                alt="Factura"
                className="w-full rounded shadow-md"
            />
        </div>
    );
}

export default OtrosFactura;