import { useMutation } from '@tanstack/react-query';
import { createTransaction, CreateTransactionDto } from '../utils/api';
import { toast } from 'react-toastify';
import queryClient from '../config/queryClient';
import { QueryKeys } from '../utils/constants';

export const useCreateTransaction = (transaction: CreateTransactionDto) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: () => createTransaction(transaction),
    onSuccess: async () => {
      toast.success('Transacción creada con éxito');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [QueryKeys.TRANSACTION] }),
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
      if (error) {
        if (typeof error.message === 'string') {
          toast.error(error.message);
        } else {
          toast.error(error.message[0]);
        }
      }
    },
  });

  return { addTransaction: mutate, ...rest };
};
