import { getTransactionsByType } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useTransactionsExpenses = (
  opts: QueryOptions<number> = {},
  type: string,
) => {
  const { data: transactionsExpense, ...rest } = useQuery<number>({
    queryKey: [QueryKeys.TRANSACTIONS_EXPENSE, type],
    queryFn: async () => await getTransactionsByType(type),

    ...opts,
  });

  return { transactionsExpense, ...rest };
};

export default useTransactionsExpenses;
