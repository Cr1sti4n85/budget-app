import { getUser, User } from '../utils/api';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../utils/constants';

const useAuth = (opts: QueryOptions<User> = {}) => {
  const { data: user, ...rest } = useQuery<User>({
    queryKey: [QueryKeys.AUTH],
    queryFn: getUser,
    staleTime: Infinity, //it's never gonna refetch the user. it fetches just once,
    // and the user will be stored in cache under the AUTH query key
    ...opts,
  });

  return { user, ...rest };
};

export default useAuth;
