'use client';

import { useCallback } from 'react';

import { Stack, Typography, Link, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@/components/loading-button/loading-button';
import { RouterLink } from '@/routes/components';
import Iconify from '@/components/iconify';

import { useFormContext } from 'react-hook-form';
import { useTranslate } from '@/locales';
import { useAuthContext } from '@/components/auth/context/auth-provider';

import { useRouter } from '@/hooks/use-router';
import { useSnackbar } from '@/components/snackbar';

import { paths } from '@/routes/paths';

export default function VerifyForm() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const { verifyEmail } = useAuthContext();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getFieldState,
    setError,
  } = useFormContext();

  const onSubmitHandler = useCallback(
    handleSubmit(async ({ email, confirmationCode }) => {
      try {
        await verifyEmail(email, confirmationCode);

        enqueueSnackbar(t('verify.messages.success'), {
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
      <Typography variant='h4'>{t('verify.labels.title')}</Typography>

      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {t('verify.labels.sub_title')}
      </Typography>

      <TextField
        {...register('email')}
        label={t('verify.labels.email')}
        error={!!getFieldState('email').error}
        helperText={getFieldState('email').error?.message}
      />

      <TextField
        type='number'
        {...register('confirmationCode')}
        label={t('verify.labels.confirmationCode')}
        error={!!getFieldState('confirmationCode').error}
        helperText={getFieldState('confirmationCode').error?.message}
      />

      <LoadingButton
        disabled={isSubmitting}
        variant='contained'
        type='submit'
        color='primary'
        label={t('verify.labels.verify')}
        loadingLabel={t('verify.labels.verifying')}
      />

      <Link
        component={RouterLink}
        href={paths.login}
        variant='subtitle2'
        sx={{ display: 'flex', alignItems: 'center' }}
        alignSelf='self-start'
      >
        <Iconify icon='eva:arrow-ios-back-fill' width={16} />
        {t('request_reset_password.labels.return')}
      </Link>
    </Stack>
  );
}
