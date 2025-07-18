import { Navigation } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';

const URL = `navigation`;

const fetchNavData = async () =>
  await getAxiosInstance().get<Navigation[]>(URL);

export const useGetNavQuery = () => {
  const { data, error, isLoading, isPending, isFetching, refetch } = useQuery({
    queryKey: ['nav-query'],
    queryFn: fetchNavData,
    select: (data) => data.data,
  });

  return {
    navData: data as Navigation[],
    error,
    isLoading,
    isPending,
    isFetching,
    refetch,
  };
};

// create useNavQuery types
