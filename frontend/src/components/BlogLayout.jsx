const BlogLayout = ({ title, image, children, relatedLinks = [] }) => {
  return (
    <div className="bg-white text-gray-900">
      <header className="bg-yellow-500 text-white py-8 text-center shadow-md">
        <h1 className="text-4xl font-bold drop-shadow-sm">Blog de Rápido y Sabroso</h1>
        <p className="mt-2 text-lg">Todo lo que quieres saber del mundo de las hamburguesas 🍔</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-600 mb-6 text-center">
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          <img
            src={image}
            alt="Imagen del artículo"
            className="w-full lg:w-1/2 rounded-2xl shadow-lg object-cover max-h-[400px]"
          />

          {relatedLinks.length > 0 && (
            <aside className="w-full lg:w-1/2 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Te puede interesar:</h3>
              {relatedLinks.map((link, index) => (
                <link.Component
                  key={index}
                  to={link.to}
                  className="bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-900 p-4 rounded-xl transition duration-200"
                >
                  {link.label}
                </link.Component>
              ))}
            </aside>
          )}
        </div>

        <article className="prose prose-lg max-w-none text-justify">{children}</article>
      </main>
    </div>
  );
};

export default BlogLayout;