const ROOTS = {
  AUTH: "auth",
  QUIZ: "quizes",
};

export const API_ENDPOINTS = {
  AUTH: {
    login: `/${ROOTS.AUTH}/login`,
    logout: `/${ROOTS.AUTH}/logout`,
    register: `/${ROOTS.AUTH}/register`,
    verify_email: `/${ROOTS.AUTH}/verify-email`,
    request_reset_password: `/${ROOTS.AUTH}/request-reset-password`,
    reset_password: `/${ROOTS.AUTH}/reset-password`,
    status: `/${ROOTS.AUTH}/status`,
  },
  QUIZES: {
    ROOT: `/${ROOTS.QUIZ}`,
  },
};
