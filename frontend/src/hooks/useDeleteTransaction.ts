import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction, Transaction } from '../utils/api';
import { toast } from 'react-toastify';
import { QueryKeys } from '../utils/constants';

export const useDeleteTransaction = (transactionId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteTransaction(transactionId),
    onSuccess: () => {
      toast.success('Transacción eliminada con éxito');
      queryClient.setQueryData(
        [QueryKeys.TRANSACTION],
        (oldData: Transaction[]) =>
          oldData.filter((transaction) => transaction.id !== transactionId),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteTransaction: mutate, ...rest };
};
