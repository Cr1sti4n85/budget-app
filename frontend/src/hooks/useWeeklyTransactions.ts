import { getWeeklyTransactions, TransactionDto } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useWeeklyTransactions = (opts: QueryOptions<TransactionDto[]> = {}) => {
  const { data: weeklyTransactions, ...rest } = useQuery<TransactionDto[]>({
    queryKey: [QueryKeys.TRANSACTIONS_WEEKLY],
    queryFn: getWeeklyTransactions,

    ...opts,
  });

  return { weeklyTransactions, ...rest };
};

export default useWeeklyTransactions;
