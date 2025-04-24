import { Category, getCategories } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';

export const CATEGORY = 'category';

const useCategories = (opts: QueryOptions<Category[]> = {}) => {
  const { data: categories, ...rest } = useQuery<Category[]>({
    queryKey: [CATEGORY],
    queryFn: getCategories,

    ...opts,
  });

  return { categories, ...rest };
};

export default useCategories;
