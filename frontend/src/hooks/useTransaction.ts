import { getTransactions, Transaction } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useTransactions = (opts: QueryOptions<Transaction[]> = {}) => {
  const { data: transactions, ...rest } = useQuery<Transaction[]>({
    queryKey: [QueryKeys.TRANSACTION],
    queryFn: getTransactions,

    ...opts,
  });

  return { transactions, ...rest };
};

export default useTransactions;
