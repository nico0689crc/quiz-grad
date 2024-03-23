'use client';

import { useCallback } from 'react';

import { IconButton, InputAdornment, Stack, Typography, Link, TextField, useMediaQuery, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@/components/loading-button/loading-button';
import { RouterLink } from '@/routes/components';
import Iconify from '@/components/iconify';

import { useFormContext } from 'react-hook-form';
import { useTranslate } from '@/locales';
import { useBoolean } from '@/hooks/use-boolean';
import { useAuthContext } from '@/components/auth/context/auth-provider';
import { useRouter } from '@/hooks/use-router';
import { useSnackbar } from '@/components/snackbar';

import { paths } from '@/routes/paths';

export default function LoginForm() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslate();
  const { login } = useAuthContext();
  const password = useBoolean();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getFieldState,
    setError,
  } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const onSubmitHandler = useCallback(
    handleSubmit(async ({ email, password }) => {
      try {
        const user = await login(email, password);

        enqueueSnackbar(t('login.labels.welcome', { name: user?.firstName ?? '' }), {
          variant: 'success',
          anchorOrigin: isUpMd
            ? { horizontal: 'right', vertical: 'bottom' }
            : { horizontal: 'center', vertical: 'top' },
        });

        router.push(paths.quizes.root);
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
      <Typography variant='h4'>{t('login.labels.title')}</Typography>
      <Stack direction='row' spacing={0.5}>
        <Typography variant='body2'>{t('login.labels.new_user')}</Typography>
        <Link component={RouterLink} href={paths.register} variant='subtitle2'>
          {t('login.labels.create_account')}
        </Link>
      </Stack>

      <Alert severity='info'>
        Testing email : <b>user@demo.com</b> / password : <b>USerdemo2024!@</b>
      </Alert>

      <TextField
        {...register('email')}
        label={t('login.labels.email')}
        error={!!getFieldState('email').error}
        helperText={getFieldState('email').error?.message}
      />

      <TextField
        {...register('password')}
        label={t('login.labels.password')}
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

      <Link
        component={RouterLink}
        href={paths.request_reset_password}
        variant='subtitle2'
        color='primary'
        underline='always'
        sx={{ alignSelf: 'flex-end' }}
      >
        {t('login.labels.forgot_password')}
      </Link>

      <LoadingButton
        disabled={isSubmitting}
        variant='contained'
        type='submit'
        color='primary'
        label={t('login.labels.login')}
        loadingLabel={t('login.labels.login_loading')}
      />
    </Stack>
  );
}
