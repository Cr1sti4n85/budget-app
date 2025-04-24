import { CategoryDto, getCategories } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';

export const CATEGORY = 'category';

const useCategories = (opts: QueryOptions<CategoryDto[]> = {}) => {
  const { data: categories, ...rest } = useQuery<CategoryDto[]>({
    queryKey: [CATEGORY],
    queryFn: getCategories,

    ...opts,
  });

  return { categories, ...rest };
};

export default useCategories;
