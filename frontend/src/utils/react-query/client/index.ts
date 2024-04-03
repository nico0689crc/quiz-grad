import {
  Question,
  QuizQueryOptions,
  QuizResponseCollection,
  QuizResponseIndividual,
  ResponseInfo,
} from "../../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

class Client {
  quizes = {
    all: (queryParams?: Partial<QuizQueryOptions>) =>
      HttpClient.get<QuizResponseCollection>(
        API_ENDPOINTS.QUIZES.ROOT,
        queryParams,
      ),
    get: (uuid: string) =>
      HttpClient.get<QuizResponseIndividual>(
        `${API_ENDPOINTS.QUIZES.ROOT}/${uuid}`,
      ),
    post: (data: {
      title: string;
      description: string;
      questions: Partial<Question>[];
    }) =>
      HttpClient.post<QuizResponseIndividual>(API_ENDPOINTS.QUIZES.ROOT, data),
    put: () => {},
    delete: (uuid: string) =>
      HttpClient.delete<ResponseInfo<null>>(
        `${API_ENDPOINTS.QUIZES.ROOT}/${uuid}`,
      ),
  };
}

const client = new Client();

export default client;
