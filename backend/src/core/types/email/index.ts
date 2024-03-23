export type SendEmailType = {
  recipient: string;
  subject: string;
};

export type SendRegistrationType = SendEmailType & {
  values: {
    firstName: string;
    activationLink: string;
    confirmationCode: string;
  };
};

export type SendResetPasswordRequestType = SendEmailType & {
  values: {
    firstName: string;
    passwordResetLink: string;
  };
};
