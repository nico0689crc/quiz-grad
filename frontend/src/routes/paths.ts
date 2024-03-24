const ROOTS = {
  ROOT: "/",
  AUTH: "/auth",
  QUIZES: "/quizes",
};

export const paths = {
  home: ROOTS.ROOT,
  terms: "/terms",
  privacy: "/privacy",
  how_works: "/how-it-works",
  features: "/features",
  about_us: "/about-us",
  login: `${ROOTS.AUTH}/login`,
  register: `${ROOTS.AUTH}/register`,
  request_reset_password: `${ROOTS.AUTH}/request-reset-password`,
  verify: `${ROOTS.AUTH}/verify`,
  reset_password: `${ROOTS.AUTH}/reset-password`,
  quizes: {
    root: ROOTS.QUIZES,
    create: `${ROOTS.QUIZES}/create`,
  },
};
