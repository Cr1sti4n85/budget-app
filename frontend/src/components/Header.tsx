import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../utils/api';
import queryClient from '../config/queryClient';

export const Header: FC = () => {
  const { user } = useAuth();

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
  return (
    <header
      className="flex items-center bg-slate-800 p-4
                shadow-sm backdrop-blur-sm"
    >
      <Link to="/">
        <FaBtc size={20} />
      </Link>
      {user && (
        <nav className="ml-auto mr-10">
          <ul className=" flex items-center gap-5">
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
      {user ? (
        <button className="btn btn-red" onClick={() => signout()}>
          <span>Cerrar sesión</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          to="/auth"
          className="py-2 text-white/50 hover:text-white ml-auto mr-10"
        >
          Iniciar sesión
        </Link>
      )}
    </header>
  );
};
