import 'dotenv/config';

export enum Services {
  AUTH = 'AUTH_SERVICE',
  USERS = 'USERS_SERVICE',
  EMAIL = 'EMAIL_SERVICE',
  QUIZ = 'QUIZ_SERVICE',
  QUESTION = 'QUESTION_SERVICE',
  ANSWER = 'ANSWER_SERVICE',
  ROOM = 'ROOM_SERVICE',
  ROOM_QUESTION = 'ROOM_QUESTION_SERVICE',
  ROOM_QUESTION_ANSWER = 'ROOM_QUESTION_ANSWER_SERVICE',
  PLAYER = 'PLAYER_SERVICE',
  GATEWAY = 'GATEWAY_SERVICE',
}

export enum Routes {
  REGISTER = 'register',
  LOGIN = 'login',
  STATUS = 'status',
  LOGOUT = 'logout',
  VERIFY_EMAIL = 'verify-email',
  REQUEST_RESET_PASSWORD = 'request-reset-password',
  RESET_PASSWORD = 'reset-password',
  AUTH = 'auth',
  USERS = 'users',
  CREATE_USER_DEMO = 'create-user-demo',
  QUIZES = 'quizes',
  QUESTION = 'questions',
  ANSWER = 'answers',
}
