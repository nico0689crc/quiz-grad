'use client';

import * as Yup from 'yup';

import { useTranslate } from '@/locales';
import { ReactHookFormProvider } from '@/components/react-hook-form-provider';
import { ResetPasswordForm } from './components';

export default function ResetPasswordView() {
  const { t } = useTranslate();

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, t('reset_password.validation.password_length'))
      .required(t('reset_password.validation.password_required')),
    passwordConfirmation: Yup.string()
      .required(t('reset_password.validation.confirm_password_required'))
      .oneOf([Yup.ref('password')], t('reset_password.validation.password_match')),
  });

  const defaultValues = {
    password: '',
    passwordConfirmation: '',
  };

  return (
    <ReactHookFormProvider schema={schema} defaultValues={defaultValues}>
      <ResetPasswordForm />
    </ReactHookFormProvider>
  );
}
