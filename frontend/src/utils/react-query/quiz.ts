import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import {
  QuizQueryOptions,
  QuizResponseCollection,
  QuizResponseIndividual,
} from "../../types";
import client from "./client";
import { useRouter } from "@/hooks/use-router";
import { useSnackbar } from "@/components/snackbar";
import { paths } from "@/routes/paths";
import { useTranslate } from "@/locales";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
  const { mutate: createQuiz, isLoading } = useMutation(client.quizes.post, {
    onSuccess({ data }: QuizResponseIndividual) {
      replace(`${paths.quizes.root}/${data.uuid}`);
    },
  });

  return {
    createQuiz,
    isLoading,
  };
};

export const useDeleteQuiz = () => {
  const { t } = useTranslate();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    mutate: deleteQuiz,
    isLoading,
    isSuccess,
  } = useMutation(client.quizes.delete, {
    onSuccess() {
      queryClient.refetchQueries([API_ENDPOINTS.QUIZES.ROOT]);
      enqueueSnackbar(t("quiz_delete.labels.delete_success"), {
        variant: "success",
        anchorOrigin: isUpMd
          ? { horizontal: "right", vertical: "bottom" }
          : { horizontal: "center", vertical: "top" },
      });
    },
    onError() {
      enqueueSnackbar(t("quiz_delete.labels.delete_error"), {
        variant: "error",
        anchorOrigin: isUpMd
          ? { horizontal: "right", vertical: "bottom" }
          : { horizontal: "center", vertical: "top" },
      });
    },
  });

  return {
    deleteQuiz,
    isLoading,
    isSuccess,
  };
};
