import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  children: React.ReactNode;
  schema: any;
  defaultValues: Record<string, string>;
}

export default function ReactHookFormProvider({ children, schema, defaultValues }: Props) {
  const methods = useForm({ resolver: yupResolver(schema), defaultValues });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
