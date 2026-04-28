function MenuCard({ menuItem, onAddToCart }) {
    const imageUrl = menuItem.image
        ? `http://localhost:5000/images/${menuItem.image}`
        : 'https://placehold.co/300x200.png';

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-4 text-center transition-transform hover:scale-105">
            <img
                src={imageUrl}
                alt={menuItem.name}
                className="w-full h-80 object-cover mb-4 rounded-lg"
            />

            <h3 className="text-lg font-bold mb-2 text-yellow-600">
                {menuItem.name}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
                {menuItem.description}
            </p>

            <div className="text-sm text-gray-500 mb-4 text-left">
                <strong>Incluye:</strong>
                <ul className="list-disc list-inside">
                    {menuItem.products?.map((product) => (
                        <li key={product.productId}>
                            {product.quantity} x {product.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-bold text-yellow-600">
                    S/. {menuItem.price}
                </span>
                <button
                    onClick={() => onAddToCart(menuItem)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-2xl transition-all shadow hover:shadow-lg active:scale-90"
                >
                    Agregar al carrito 🛒
                </button>
            </div>
        </div>
    );
}

export default MenuCard;
