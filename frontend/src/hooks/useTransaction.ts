import { getTransactions, TransactionDto } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useTransactions = (opts: QueryOptions<TransactionDto[]> = {}) => {
  const { data: transactions, ...rest } = useQuery<TransactionDto[]>({
    queryKey: [QueryKeys.TRANSACTION],
    queryFn: getTransactions,

    ...opts,
  });

  return { transactions, ...rest };
};

export default useTransactions;
