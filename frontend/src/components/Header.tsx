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
      className="flex flex-wrap  items-center justify-between bg-slate-800 p-4
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
        <nav
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
        >
          <ul className=" flex flex-col md:flex-row items-center gap-5 mt-4 md:mt-0">
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
                Categorias
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/*Logout */}
      <div
        className={`${isMenuOpen ? 'mt-4 w-full flex flex-col items-center ' : 'hidden'} md:block md:mt-0 md:w-auto`}
      >
        {user && (
          <button className="btn btn-red md:w-auto" onClick={() => signout()}>
            <span>Cerrar sesión</span>
            <FaSignOutAlt />
          </button>
        )}
      </div>
    </header>
  );
};
