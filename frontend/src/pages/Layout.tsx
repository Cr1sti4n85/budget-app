import { FC } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import ProtectedRoutes from '../components/ProtectedRoutes';

const Layout: FC = () => {
  return (
    <div className="min-h-screen  bg-slate-900 text-white pb-20">
      <ProtectedRoutes>
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </ProtectedRoutes>
    </div>
  );
};

export default Layout;
