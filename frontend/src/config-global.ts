import { paths } from "src/routes/paths";

export const HOST_API = `${process.env.NEXT_PUBLIC_BACKEND_HOST_DOMAIN}/api`;
export const PATH_AFTER_LOGIN = paths.quizes.root;

export const STORAGE_KEY_SETTINGS = "settings_quizgrad";
export const STORAGE_KEY_USER_DATA_QUIZ_WEBSOCKET =
  "STORAGE_KEY_USER_DATA_QUIZ_WEBSOCKET";
