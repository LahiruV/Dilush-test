import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommonProps, Todo } from '@peerless/models';
import { useAppStateContext } from '@peerless/providers';
import { useGetTodoQuery } from '@peerless/queries';
import { getAxiosInstance } from '@peerless/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FC, useState } from 'react';

export const HomePage: FC<CommonProps> = () => {
  const { AppName, currentPage } = useAppStateContext();

  const { todoData, isPending, error } = useGetTodoQuery();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutateAsync } = useMutation({
    mutationFn: (newTodo: Todo) => {
      return getAxiosInstance().post('todos', newTodo);
    },
    onSuccess: () => {
      setTitle('');
      setDescription('');
      queryClient.invalidateQueries({ queryKey: ['todo-query'] });
    },
  });

  localStorage.setItem('test', 'rooban');
  localStorage.getItem('test');

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!todoData) return;

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        Home Page | {AppName} | {currentPage}
        <FontAwesomeIcon icon={faEnvelope} size='2x' />
        <br />
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button
          onClick={async (e) => {
            e.preventDefault();
            const todo = { title, description };
            await mutateAsync(todo);
          }}
        >
          Add Todo
        </button>
        {todoData.map((todo) => (
          <div key={todo.id}>
            {todo.title} - {todo.description}
          </div>
        ))}
      </div>
    </div>
  );
};
