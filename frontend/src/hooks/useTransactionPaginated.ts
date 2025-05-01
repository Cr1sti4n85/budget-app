import { getPaginatedTransactions, TransactionDto } from '../utils/api';
import {
  keepPreviousData,
  QueryOptions,
  useQuery,
} from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useTransactionsPaginated = (
  opts: QueryOptions<TransactionDto[]> = {},
  page: number,
  limit: number,
) => {
  const { data: paginatedTransactions, ...rest } = useQuery<TransactionDto[]>({
    queryKey: [QueryKeys.TRANSACTION_PAGINATED, page, limit],
    queryFn: async () => await getPaginatedTransactions(page, limit),
    placeholderData: keepPreviousData,
    ...opts,
  });

  return { paginatedTransactions, ...rest };
};

export default useTransactionsPaginated;
