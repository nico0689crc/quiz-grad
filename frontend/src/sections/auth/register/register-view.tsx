'use client';

import * as Yup from 'yup';

import { useTranslate } from '@/locales';
import { ReactHookFormProvider } from '@/components/react-hook-form-provider';
import { RegisterForm } from './components';

export default function RegisterView() {
  const { t } = useTranslate();

  const schema = Yup.object().shape({
    firstName: Yup.string().required(t('register.validation.first_name_required')),
    lastName: Yup.string().required(t('register.validation.last_name_required')),
    email: Yup.string().required(t('register.validation.email_required')).email(t('register.validation.email_format')),
    password: Yup.string().required(t('register.validation.password_required')),
    passwordConfirmation: Yup.string().required(t('register.validation.password_required')),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <ReactHookFormProvider schema={schema} defaultValues={defaultValues}>
      <RegisterForm />
    </ReactHookFormProvider>
  );
}
