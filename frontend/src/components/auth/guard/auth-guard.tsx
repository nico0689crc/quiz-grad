"use client";

import { useEffect } from "react";
import { paths } from "@/routes/paths";
import { useRouter } from "@/hooks/use-router";
import { useAuthContext } from "../context/auth-provider";
import { LoadingSpinner } from "@/components/loading-spinner";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      router.replace(`${paths.login}?${searchParams}`);
    }
  }, [loading, authenticated, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
