import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryDto, deleteCategory } from '../utils/api';
import { CATEGORY } from './useCategory';
import { toast } from 'react-toastify';

export const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteCategory(categoryId),
    //we need to update the cache in order to see the change in frontend
    onSuccess: () => {
      queryClient.setQueryData([CATEGORY], (oldData: CategoryDto[]) =>
        oldData.filter((category) => category.id !== categoryId),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCategory: mutate, ...rest };
};
