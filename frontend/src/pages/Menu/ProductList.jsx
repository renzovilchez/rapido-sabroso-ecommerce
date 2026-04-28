import { Link } from "react-router-dom";

function ProductList() {
  const burgers = [
    {
      label: "Hamburguesas Clásicas",
      path: "/carta/hamburguesas-clasicas",
    },
    {
      label: "Hamburguesas Especiales",
      path: "/carta/hamburguesas-especiales",
    },
    {
      label: "Hamburguesas Veganas",
      path: "/carta/hamburguesas-veganas",
    },
    {
      label: "Hamburguesas Gourmet",
      path: "/carta/hamburguesas-gourmet",
    },
  ];

  const drinks = [
    { label: "Refrescos", path: "/carta/refrescos" },
    { label: "Jugos Naturales", path: "/carta/jugos-naturales" },
    { label: "Agua", path: "/carta/agua" },
    {
      label: "Bebidas Tradicionales",
      path: "/carta/bebidas-tradicionales",
    },
  ];

  const renderGroup = (title, items) => (
    <div className="md:w-1/2 px-2">
      <h2 className="text-xl font-semibold mb-4 text-yellow-700 text-center">
        {title}
      </h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-2xl text-center shadow transition-transform hover:scale-105"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl m-auto mt-8 mb-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-yellow-600">
        Carta
      </h1>
      <div className="my-8"></div>
      <div className="flex flex-col md:flex-row gap-6">
        {renderGroup("Hamburguesas", burgers)}
        {renderGroup("Bebidas", drinks)}
      </div>
    </div>
  );
}

export default ProductList;
