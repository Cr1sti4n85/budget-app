import { FC, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaBars, FaBtc, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../utils/api';
import queryClient from '../config/queryClient';

export const Header: FC = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { mutate: signout } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear(); //clears the entire cache
      navigate('/inicio', { replace: true });
    },
  });

  const handleActive = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? 'text-white' : 'text-white/50';
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="relative z-40 flex flex-wrap  items-center justify-between bg-slate-800 p-4
                shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-center">
        <Link to="/">
          <FaBtc size={20} />
        </Link>
      </div>
      {/*mobile menu button */}
      {user && (
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}
      {/*navigation menu */}
      {user && (
        <nav className={'hidden md:block md:w-auto'}>
          <ul className=" flex flex-row items-center gap-5">
            <li>
              <NavLink to="/" className={handleActive}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/transactions" className={handleActive}>
                Transacciones
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className={handleActive}>
                Categorias
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/*logout desktop */}
      {user && (
        <div className="hidden md:block md:mt-0 md:w-auto">
          <button className="btn btn-red md:w-auto" onClick={() => signout()}>
            <span>Cerrar sesión</span>
            <FaSignOutAlt />
          </button>
        </div>
      )}

      {/*Menu mobile */}
      {user && isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-800 z-50 p-4 shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-5">
            <li>
              <NavLink
                to="/"
                className={handleActive}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transactions"
                className={handleActive}
                onClick={() => setIsMenuOpen(false)}
              >
                Transacciones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={handleActive}
                onClick={() => setIsMenuOpen(false)}
              >
                Categorías
              </NavLink>
            </li>
            <li>
              <button className="btn btn-red w-full" onClick={() => signout()}>
                <span>Cerrar sesión</span>
                <FaSignOutAlt />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
