import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction, TransactionDto } from '../utils/api';
import { toast } from 'react-toastify';
import { QueryKeys } from '../utils/constants';

export const useDeleteTransaction = (transactionId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: async () => {
      toast.success('Transacción eliminada con éxito');
      queryClient.setQueryData(
        [QueryKeys.TRANSACTION],
        (oldData: TransactionDto[]) =>
          oldData.filter((transaction) => transaction.id !== transactionId),
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.TRANSACTION_PAGINATED],
        }),
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.TRANSACTIONS_INCOME],
        }),
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.TRANSACTIONS_EXPENSE],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteTransaction: mutate, ...rest };
};
