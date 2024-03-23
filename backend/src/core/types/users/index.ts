export type CreateUserAttributes = Partial<{
  uuid: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  returnUrl: string;
  confirmationCode: string;
}>;

export type FindOneUserParams = Partial<{
  id: number;
  email: string;
  uuid: string;
}>;
