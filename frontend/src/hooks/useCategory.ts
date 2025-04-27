import { CategoryDto, getCategories } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useCategories = (opts: QueryOptions<CategoryDto[]> = {}) => {
  const { data: categories, ...rest } = useQuery<CategoryDto[]>({
    queryKey: [QueryKeys.CATEGORY],
    queryFn: getCategories,

    ...opts,
  });

  return { categories, ...rest };
};

export default useCategories;
