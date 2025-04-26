import { useMutation } from '@tanstack/react-query';
import {
  createTransaction,
  CreateTransactionDto,
  Transaction,
} from '../utils/api';
import { toast } from 'react-toastify';
import queryClient from '../config/queryClient';

export const TRANSACTION = 'transaction';

export const useCreateTransaction = (transaction: CreateTransactionDto) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: () => createTransaction(transaction),
    onSuccess: (newTransaction) => {
      toast.success('Transacción creada con éxito');
      queryClient.setQueryData<Transaction[]>(
        [TRANSACTION],
        (old: Transaction[] | undefined) => {
          return old ? [...old, newTransaction] : [newTransaction];
        },
      );
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
