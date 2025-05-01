import { Link } from 'react-router';
import { FaChartLine, FaUser } from 'react-icons/fa';
import financeImage from '../assets/img/budget.jpg'; // Asegúrate de tener esta imagen o reemplázala

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header con botones de navegación */}
      <header className="bg-slate-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav className="flex gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors"
          >
            <FaChartLine />
            Dashboard
          </Link>
          <Link
            to="/auth"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
          >
            <FaUser />
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-8 gap-8">
        {/* Texto y llamada a la acción */}
        <div className="max-w-md flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-4xl font-bold">
            Toma el control de tus finanzas
          </h2>
          <p className="text-xl text-slate-300">
            Registra tus ingresos y gastos mensuales de manera sencilla y mantén
            un historial completo de tus movimientos financieros.
          </p>
          <div>
            <Link
              to="/auth"
              className="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Empieza ahora
            </Link>
          </div>
        </div>

        {/* Imagen ilustrativa */}
        <div className="max-w-md">
          <img
            src={financeImage}
            alt="Control de finanzas personales"
            className="rounded-lg shadow-xl"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 p-4 text-center text-slate-400">
        <p>
          © {new Date().getFullYear()} Budget App - Todos los derechos
          reservados
        </p>
      </footer>
    </div>
  );
};
