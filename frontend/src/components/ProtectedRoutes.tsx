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
          <div className="loader"></div>
        </div>
      ) : user ? (
        children
      ) : (
        <Navigate to="/auth" replace />
      )}
    </>
  );
};
export default ProtectedRoutes;
