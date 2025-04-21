import { FC, useState } from 'react';

const Auth: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  return (
    <div
      className="mt-40 flex flex-col items-center justify-center 
    bg-stale-900 text-white"
    >
      <h1 className="mb-10 text-center text-xl">
        {isLoggedIn ? 'Iniciar sesión' : 'Registro'}
      </h1>
      <form className="flex w-1/3 flex-col mx-auto gap-5">
        <input
          type="text"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLoggedIn && (
          <input
            type="password"
            className="input"
            placeholder="Confirmar password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <button className="btn btn-green mx-auto">Enviar</button>
      </form>
      <div className="flex justify-center mt-5">
        {isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-slate-300 hover:text-white"
          >
            ¿No tienes cuenta?
          </button>
        ) : (
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-slate-300 hover:text-white"
          >
            ¿Ya tienes cuenta?
          </button>
        )}
      </div>
    </div>
  );
};
export default Auth;
