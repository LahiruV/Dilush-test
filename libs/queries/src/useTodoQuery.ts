import { Todo } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';

const URL = `todos`;

const fetchTodoData = async () => await getAxiosInstance().get<Todo[]>(URL);
// const postTodoData = (todo: Todo) => axios.post(URL, todo);

export const useGetTodoQuery = () => {
  const { data, error, isLoading, isPending, isFetching, refetch } = useQuery({
    queryKey: ['todo-query'],
    queryFn: fetchTodoData,
    select: (data) => data.data,
  });

  return {
    todoData: data as Todo[],
    error,
    isLoading,
    isPending,
    isFetching,
    refetch,
  };
};

// export const usePostTodoQuery = () => {
//   return useMutation<Todo>({
//     mutationFn: postTodoData(t),
//   });
// };
