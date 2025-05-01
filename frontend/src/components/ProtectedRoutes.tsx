import React, { FC } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loader"></span>
        </div>
      ) : user ? (
        children
      ) : (
        <Navigate to="/inicio" replace />
      )}
    </>
  );
};
export default ProtectedRoutes;
