import { useMutation, useQuery } from "react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import {
  QuizQueryOptions,
  QuizResponseCollection,
  QuizResponseIndividual,
} from "../../types";
import client from "./client";
import { useRouter } from "@/hooks/use-router";
import { paths } from "@/routes/paths";

export const useQuizes = (options?: Partial<QuizQueryOptions>) => {
  const { data, isLoading, error } = useQuery<QuizResponseCollection, Error>(
    [API_ENDPOINTS.QUIZES.ROOT, options],
    () => client.quizes.all(),
    { refetchOnWindowFocus: false },
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
    { refetchOnWindowFocus: false },
  );

  return {
    quiz: data?.data,
    isLoading,
    error,
  };
};

export const useCreateQuiz = () => {
  const { replace } = useRouter();
  const { mutate: createQuiz, isLoading } = useMutation(
    client.quizes.post,
    {
      onSuccess({ data }: QuizResponseIndividual) {
        console.log(data);
        replace(`${paths.quizes.root}/${data.uuid}`)
      },
    },
  );

  return {
    createQuiz,
    isLoading,
  };
};
