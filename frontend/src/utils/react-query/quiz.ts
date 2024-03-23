import { useQuery } from 'react-query';
import { API_ENDPOINTS } from './client/api-endpoints';
import { QuizQueryOptions, QuizResponseCollection, QuizResponseIndividual } from '../../types';
import client from './client';

export const useQuizes = (options?: Partial<QuizQueryOptions>) => {
  const { data, isLoading, error } = useQuery<QuizResponseCollection, Error>(
    [API_ENDPOINTS.QUIZES.ROOT, options],
    () => client.quizes.all(),
    { refetchOnWindowFocus: false }
  );

  return {
    quizes: data?.data,
    isLoading,
    error,
    isDataEmpty: data?.data?.length === 0,
  };
};

export const useQuiz = (uuid: string) => {
  const { data, isLoading, error } = useQuery<QuizResponseIndividual, Error>(
    [`${API_ENDPOINTS.QUIZES.ROOT}/${uuid}`],
    () => client.quizes.get(uuid),
    { refetchOnWindowFocus: false }
  );

  return {
    quiz: data?.data,
    isLoading,
    error,
  };
};
