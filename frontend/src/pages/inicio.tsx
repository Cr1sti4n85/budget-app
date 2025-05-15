import { useState } from 'react';
import { Link } from 'react-router';
import { FaBars, FaChartLine, FaTimes, FaUser } from 'react-icons/fa';
import financeImage from '../assets/img/budget.jpg';

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 p-4 flex justify-between items-center shadow-md relative">
        <h1 className="text-2xl font-bold">Budget App</h1>
        {/* Botón de menú hamburguesa (solo visible en móvil) */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className="hidden md:flex gap-4">
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
        {/* Menú desplegable para móvil */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-800 flex flex-col items-start gap-2 px-4 py-2 md:hidden z-10">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 hover:bg-slate-700 w-50 m-auto px-4 py-2 rounded-lg text-white"
              onClick={() => setIsOpen(false)}
            >
              <FaChartLine />
              Dashboard
            </Link>
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 hover:bg-slate-700 w-50 m-auto px-4 py-2 rounded-lg text-white"
              onClick={() => setIsOpen(false)}
            >
              <FaUser />
              Iniciar Sesión
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-8 gap-8">
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

        <div className="max-w-md">
          <img
            src={financeImage}
            alt="Control de finanzas personales"
            className="rounded-lg shadow-xl"
          />
        </div>
      </main>

      <footer className="bg-slate-800 p-4 text-center text-slate-400">
        <p>
          © {new Date().getFullYear()} Budget App - Todos los derechos
          reservados
        </p>
      </footer>
    </div>
  );
};
