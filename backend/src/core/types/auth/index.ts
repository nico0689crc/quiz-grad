export type ValidateUserAttributes = {
  email: string;
  password: string;
};

export type RegisterUserAttributes = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  returnUrl: string;
};

export type VerifyEmailUserAttributes = {
  email: string;
  confirmationCode: string;
};

export type RequestResetPasswordAttributes = {
  email: string;
  returnUrl: string;
};

export type ResetPasswordAttributes = {
  uuid: string;
  token: string;
  password: string;
  passwordConfirmation: string;
};
