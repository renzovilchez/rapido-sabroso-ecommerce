import { Link } from 'react-router-dom';

const blogPosts = [
  { title: 'Historia de cómo surgió nuestro sueño', path: '/blog/historia' },
  { title: '¿Con qué acompañar tu hamburguesa?', path: '/blog/acompanamientos' },
  { title: 'Beneficios de disfrutar una buena hamburguesa', path: '/blog/beneficios' },
  { title: 'Datos curiosos sobre las hamburguesas', path: '/blog/curiosidades' },
  { title: '¡Descubre las novedades más deliciosas del menú!', path: '/blog/novedades' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

function Blog() {
  return (
    <motion.section
      className="p-6 max-w-5xl mx-auto my-12"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: {} }}
    >
      <motion.h1
        className="text-4xl font-bold mb-10 text-yellow-500 text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestro Blog
      </motion.h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              to={post.path}
              className="block h-full bg-yellow-400 text-white rounded-2xl shadow-lg p-6 border border-yellow-700/30 transition-all hover:shadow-yellow-500/30 hover:scale-[1.015] duration-300"
            >
              <h2 className="text-xl font-semibold text-neutral-900 leading-snug">
                {post.title}
              </h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Blog;