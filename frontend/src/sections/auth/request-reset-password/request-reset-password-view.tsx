'use client';

import * as Yup from 'yup';

import { useTranslate } from '@/locales';
import { ReactHookFormProvider } from '@/components/react-hook-form-provider';
import { RequestResetPasswordForm } from './components';

export default function RequestResetPasswordView() {
  const { t } = useTranslate();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required(t('request_reset_password.validation.email_required'))
      .email(t('request_reset_password.validation.email_format')),
  });

  const defaultValues = {
    email: '',
  };
  return (
    <ReactHookFormProvider schema={schema} defaultValues={defaultValues}>
      <RequestResetPasswordForm />
    </ReactHookFormProvider>
  );
}
