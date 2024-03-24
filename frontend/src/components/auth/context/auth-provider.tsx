"use client";

import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./auth-context";
import { paths } from "@/routes/paths";
import { useRouter } from "@/hooks/use-router";
import axios, { endpoints } from "@/utils/axios";
import { AuthStateType, Action, Types } from "../types";
import { AxiosRequestConfig } from "axios";

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

type Props = {
  children: React.ReactNode;
};

const config: AxiosRequestConfig = { withCredentials: true };

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const {
        data: { data: user },
      } = await axios.get(endpoints.auth.status, config);

      dispatch({
        type: Types.INITIAL,
        payload: {
          user: user ?? null,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const {
      data: { data: user },
    } = await axios.post(endpoints.auth.login, { email, password }, config);

    dispatch({
      type: Types.INITIAL,
      payload: {
        user: {
          ...user,
          id: user.uuid,
        },
      },
    });

    return user;
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      passwordConfirmation: string,
      firstName: string,
      lastName: string,
    ) => {
      await axios.post(endpoints.auth.register, {
        email,
        password,
        passwordConfirmation,
        firstName,
        lastName,
        returnUrl: process.env.NEXT_PUBLIC_FRONTEND_HOST_DOMAIN,
      });
    },
    [],
  );

  // CONFIRM REGISTER
  const verifyEmail = useCallback(
    async (email: string, confirmationCode: string) => {
      await axios.post(endpoints.auth.verify_email, {
        email,
        confirmationCode,
      });
    },
    [],
  );

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.delete(endpoints.auth.logout, config);

    dispatch({
      type: Types.LOGOUT,
    });

    router.replace(paths.login);
  }, []);

  // REQUEST RESET PASSWORD
  const requestResetPassword = useCallback(async (email: string) => {
    await axios.post(endpoints.auth.request_reset_password, {
      email,
      returnUrl: process.env.NEXT_PUBLIC_HOST_APP,
    });
  }, []);

  // RESET PASSWORD
  const resetPassword = useCallback(
    async (
      uuid: string,
      token: string,
      password: string,
      passwordConfirmation: string,
    ) => {
      await axios.post(endpoints.auth.reset_password, {
        uuid,
        token,
        password,
        passwordConfirmation,
      });
    },
    [],
  );

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";
  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      logout,
      register,
      resetPassword,
      requestResetPassword,
      verifyEmail,
    }),
    [
      login,
      logout,
      register,
      resetPassword,
      requestResetPassword,
      verifyEmail,
      state,
      status,
    ],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext context must be use inside AuthProvider");
  }

  return context;
};
