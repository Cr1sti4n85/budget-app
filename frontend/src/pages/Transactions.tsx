import { FC } from 'react';
import useAuth from '../hooks/useAuth';

const Transactions: FC = () => {
  const { user } = useAuth();
  return <div>Transactions</div>;
};

export default Transactions;
