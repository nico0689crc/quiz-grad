"use client";

import { useCallback } from "react";

import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Link,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@/components/loading-button/loading-button";
import { RouterLink } from "@/routes/components";
import Iconify from "@/components/iconify";

import { useFormContext } from "react-hook-form";
import { useTranslate } from "@/locales";
import { useBoolean } from "@/hooks/use-boolean";
import { useAuthContext } from "@/components/auth/context/auth-provider";
import { useSnackbar } from "@/components/snackbar";
import { useRouter } from "@/hooks/use-router";

import { paths } from "@/routes/paths";

export default function RegisterForm() {
  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const { register: registerUser } = useAuthContext();
  const password = useBoolean();
  const passwordConfirmation = useBoolean();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getFieldState,
    setError,
  } = useFormContext();

  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const onSubmitHandler = useCallback(
    handleSubmit(
      async ({
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
      }) => {
        try {
          await registerUser(
            email,
            password,
            passwordConfirmation,
            firstName,
            lastName,
          );

          enqueueSnackbar(t("register.labels.register_success"), {
            variant: "success",
            anchorOrigin: isUpMd
              ? { horizontal: "right", vertical: "bottom" }
              : { horizontal: "center", vertical: "top" },
            autoHideDuration: 10000,
          });

          router.push(paths.home);
        } catch (error) {
          if (Array.isArray(error?.message)) {
            error?.message?.forEach((error: any) =>
              setError(error.property, { message: error.message }),
            );
          } else {
            enqueueSnackbar(
              error?.message ?? t("common.labels.something_went_wrong"),
              {
                variant: "error",
                anchorOrigin: isUpMd
                  ? { horizontal: "right", vertical: "bottom" }
                  : { horizontal: "center", vertical: "top" },
              },
            );
          }
        }
      },
    ),
    [],
  );

  return (
    <Stack component="form" rowGap={3} onSubmit={onSubmitHandler}>
      <Typography variant="h4">{t("register.labels.title")}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">
          {t("register.labels.have_account")}
        </Typography>

        <Link href={paths.login} component={RouterLink} variant="subtitle2">
          {t("register.labels.sign_in")}
        </Link>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1}
      >
        <TextField
          {...register("firstName")}
          fullWidth
          label={t("register.labels.firstName")}
          error={!!getFieldState("firstName").error}
          helperText={getFieldState("firstName").error?.message}
        />
        <TextField
          {...register("lastName")}
          fullWidth
          label={t("register.labels.lastName")}
          error={!!getFieldState("lastName").error}
          helperText={getFieldState("lastName").error?.message}
        />
      </Stack>

      <TextField
        {...register("email")}
        fullWidth
        label={t("register.labels.email")}
        error={!!getFieldState("email").error}
        helperText={getFieldState("email").error?.message}
      />

      <TextField
        {...register("password")}
        label={t("register.labels.password")}
        type={password.value ? "text" : "password"}
        error={!!getFieldState("password").error}
        helperText={getFieldState("password").error?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register("passwordConfirmation")}
        label={t("register.labels.passwordConfirmation")}
        type={passwordConfirmation.value ? "text" : "password"}
        error={!!getFieldState("passwordConfirmation").error}
        helperText={getFieldState("passwordConfirmation").error?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={passwordConfirmation.onToggle} edge="end">
                <Iconify
                  icon={
                    passwordConfirmation.value
                      ? "solar:eye-bold"
                      : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        disabled={isSubmitting}
        variant="contained"
        type="submit"
        color="primary"
        label={t("register.labels.create_account")}
        loadingLabel={t("register.labels.create_account_loading")}
      />
    </Stack>
  );
}
