'use client';

import { useCallback } from 'react';

import { IconButton, InputAdornment, Stack, Typography, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@/components/loading-button/loading-button';
import Iconify from '@/components/iconify';

import { useFormContext } from 'react-hook-form';
import { useTranslate } from '@/locales';
import { useBoolean } from '@/hooks/use-boolean';
import { useAuthContext } from '@/components/auth/context/auth-provider';
import { useSnackbar } from '@/components/snackbar';
import { useRouter } from '@/hooks/use-router';
import { useSearchParams } from '@/hooks/use-search-params';

import { paths } from '@/routes/paths';

export default function ResetPasswordForm() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const { t } = useTranslate();
  const { resetPassword } = useAuthContext();

  const password = useBoolean();
  const passwordConfirmation = useBoolean();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getFieldState,
    setError,
  } = useFormContext();

  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const onSubmitHandler = useCallback(
    handleSubmit(async ({ password, passwordConfirmation }) => {
      try {
        const token: string = searchParams.get('token')!;
        const uuid: string = searchParams.get('uuid')!;

        await resetPassword(uuid, token, password, passwordConfirmation);

        enqueueSnackbar(t('reset_password.labels.success_message'), {
          variant: 'success',
          anchorOrigin: isUpMd
            ? { horizontal: 'right', vertical: 'bottom' }
            : { horizontal: 'center', vertical: 'top' },
          autoHideDuration: 10000,
        });

        router.push(paths.login);
      } catch (error) {
        if (Array.isArray(error?.message)) {
          error?.message?.forEach((error: any) => setError(error.property, { message: error.message }));
        } else {
          enqueueSnackbar(error?.message ?? t('common.labels.something_went_wrong'), {
            variant: 'error',
            anchorOrigin: isUpMd
              ? { horizontal: 'right', vertical: 'bottom' }
              : { horizontal: 'center', vertical: 'top' },
          });
        }
      }
    }),
    []
  );

  return (
    <Stack component='form' rowGap={3} onSubmit={onSubmitHandler}>
      <Typography variant='h4'>{t('reset_password.labels.title')}</Typography>

      <TextField
        {...register('password')}
        label={t('reset_password.labels.password')}
        type={password.value ? 'text' : 'password'}
        error={!!getFieldState('password').error}
        helperText={getFieldState('password').error?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={password.onToggle} edge='end'>
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('passwordConfirmation')}
        label={t('reset_password.labels.passwordConfirmation')}
        type={passwordConfirmation.value ? 'text' : 'password'}
        error={!!getFieldState('passwordConfirmation').error}
        helperText={getFieldState('passwordConfirmation').error?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={passwordConfirmation.onToggle} edge='end'>
                <Iconify icon={passwordConfirmation.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        disabled={isSubmitting}
        variant='contained'
        type='submit'
        color='primary'
        label={t('reset_password.labels.submit')}
        loadingLabel={t('reset_password.labels.submiting')}
      />
    </Stack>
  );
}
