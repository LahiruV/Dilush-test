import { Navigation } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchNavigationData = async () => await axios.get('http://localhost:3001/api/cms/navigation');

export const useNavigationQuery = () => {
  const { data, error, isLoading, isPending, isFetching, refetch } = useQuery({
    queryKey: ['navigation-query'],
    queryFn: fetchNavigationData,
    select: (data) => data.data,
  });

  return {
    navigationData: data as Navigation[],
    error,
    isLoading,
    isPending,
    isFetching,
    refetch,
  };
};

// create useNavQuery types
