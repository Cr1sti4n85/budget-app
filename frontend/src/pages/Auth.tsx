import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaSpinner } from 'react-icons/fa6';
import { login, register } from '../utils/api';
import { toast } from 'react-toastify';
import { FaHome } from 'react-icons/fa';

const Auth: FC = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Ha iniciado sesión correctamente');
      navigate('/', { replace: true });
    },
    onError: (error) => {
      if (error) {
        if (typeof error.message === 'string') {
          toast.error(error.message);
        } else {
          toast.error(error.message[0]);
        }
      }
    },
  });

  const { mutate: createAccount, isPending: isRegistering } = useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success('Usuario creado con éxito');
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      if (error) {
        if (typeof error.message === 'string') {
          toast.error(error.message);
        } else {
          toast.error(error.message[0]);
        }
      }
    },
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Budget App</h1>
        <nav className="flex gap-4">
          <Link
            to="/inicio"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
          >
            <FaHome />
            Inicio
          </Link>
        </nav>
      </header>
      <div className="pt-30 flex-grow bg-stale-900 text-white">
        <h1 className="mb-10 text-center text-xl">
          {isLoggedIn ? 'Iniciar sesión' : 'Registro'}
        </h1>
        <form className="flex w-1/3 flex-col mx-auto gap-5">
          <input
            type="email"
            value={email}
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggedIn ? (
            <>
              <input
                type="password"
                value={confirmPassword}
                className="input"
                placeholder="Confirmar password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className={`btn btn-green mx-auto`}
                disabled={!email || !password || password !== confirmPassword}
                onClick={(e) => {
                  e.preventDefault();
                  createAccount({ email, password, confirmPassword });
                }}
              >
                {isRegistering ? (
                  <>
                    {' '}
                    <FaSpinner className="animate-spin text-2xl" />
                    Cargando
                  </>
                ) : (
                  'Registrarse'
                )}
              </button>
            </>
          ) : (
            <button
              className={`btn btn-green mx-auto `}
              disabled={!email || !password}
              onClick={(e) => {
                e.preventDefault();
                signIn({ email, password });
              }}
            >
              {isSigningIn ? (
                <>
                  {' '}
                  <FaSpinner className="animate-spin text-2xl" />
                  Cargando
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          )}
        </form>
        <div className="flex flex-col justify-center mt-5">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="text-slate-300 hover:text-white"
            >
              ¿No tienes cuenta?
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
                setConfirmPassword('');
              }}
              className="text-slate-300 hover:text-white"
            >
              ¿Ya tienes cuenta?
            </button>
          )}
          <button className="text-slate-300 hover:text-white text-xs pt-1">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

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
export default Auth;
