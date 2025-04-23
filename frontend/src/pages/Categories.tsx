import { FC } from 'react';
import useAuth from '../hooks/useAuth';

const Categories: FC = () => {
  const { user } = useAuth();
  return <div>Categories</div>;
};

export default Categories;
