import {
  QuizQueryOptions,
  QuizResponseCollection,
  QuizResponseIndividual,
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
    post: () => {},
    put: () => {},
    delete: () => {},
  };
}

const client = new Client();

export default client;
