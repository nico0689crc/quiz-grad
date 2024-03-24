"use client";

import * as Yup from "yup";

import { useSearchParams } from "@/hooks/use-search-params";
import { useTranslate } from "@/locales";
import { ReactHookFormProvider } from "@/components/react-hook-form-provider";
import { VerifyForm } from "./components";

export default function VerifyView() {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const schema = Yup.object().shape({
    confirmationCode: Yup.string()
      .min(6, t("verify.validation.code_format"))
      .required(t("verify.validation.code_required")),
    email: Yup.string()
      .required(t("verify.validation.email_required"))
      .email(t("verify.validation.email_format")),
  });

  const defaultValues = {
    confirmationCode: "",
    email: email || "",
  };

  return (
    <ReactHookFormProvider schema={schema} defaultValues={defaultValues}>
      <VerifyForm />
    </ReactHookFormProvider>
  );
}
