import { FC } from 'react';
import useAuth from '../hooks/useAuth';

const Home: FC = () => {
  const { user } = useAuth();
  return <div>Home</div>;
};

export default Home;
