import { getTransactionsByType } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useTransactionsIncome = (
  opts: QueryOptions<number> = {},
  type: string,
) => {
  const { data: transactionsIncome, ...rest } = useQuery<number>({
    queryKey: [QueryKeys.TRANSACTIONS_INCOME, type],
    queryFn: async () => await getTransactionsByType(type),

    ...opts,
  });

  return { transactionsIncome, ...rest };
};

export default useTransactionsIncome;
