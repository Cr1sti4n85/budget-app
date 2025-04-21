import { FC } from 'react';
import { Outlet } from 'react-router';

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div>HEADER</div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
