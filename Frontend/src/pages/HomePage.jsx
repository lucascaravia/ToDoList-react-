import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-500 min-h-screen flex items-center p-10">
      {/* Contenedor principal */}
      <div className="flex flex-wrap justify-between items-center w-full max-w-7xl mx-auto">
        {/* Sección de Texto */}
        <div className="w-full lg:w-1/2 text-white space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Organiza tu día con <span className="text-orange-400">React Tasks</span>
          </h1>
          <p className="text-lg text-gray-300">
            Tu agenda virtual para gestionar tareas de forma simple y efectiva. ¡Nunca más olvides lo importante!
          </p>
          <Link
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition hover:scale-105 mt-4 inline-block"
            to="/register"
          >
            Comenzar ahora
          </Link>
        </div>

        {/* Sección de Imagen */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="./public/images-removebg-preview.png"
            alt="Gestión de tareas"
            className="w-full rounded-lg "
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
