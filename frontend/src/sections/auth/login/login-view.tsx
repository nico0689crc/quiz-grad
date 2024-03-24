"use client";

import * as Yup from "yup";

import { useTranslate } from "@/locales";
import { ReactHookFormProvider } from "@/components/react-hook-form-provider";
import { LoginForm } from "./components";

export default function LoginView() {
  const { t } = useTranslate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required(t("login.validation.email_required"))
      .email(t("login.validation.email_format")),
    password: Yup.string().required(t("login.validation.password_required")),
  });

  const defaultValues = {
    email:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_USER!
        : "",
    password:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_PASSWORD!
        : "",
  };

  return (
    <ReactHookFormProvider schema={schema} defaultValues={defaultValues}>
      <LoginForm />
    </ReactHookFormProvider>
  );
}
