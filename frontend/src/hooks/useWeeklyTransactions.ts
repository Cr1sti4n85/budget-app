import { getWeeklyTransactions, WeeklyStats } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useWeeklyTransactions = (opts: QueryOptions<WeeklyStats> = {}) => {
  const { data: weeklyTransactions, ...rest } = useQuery<WeeklyStats>({
    queryKey: [QueryKeys.TRANSACTIONS_WEEKLY],
    queryFn: getWeeklyTransactions,

    ...opts,
  });

  return { weeklyTransactions, ...rest };
};

export default useWeeklyTransactions;
