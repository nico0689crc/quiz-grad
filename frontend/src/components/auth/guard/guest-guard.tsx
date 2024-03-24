"use client";

import { useEffect } from "react";
import { paths } from "@/routes/paths";
import { useRouter } from "@/hooks/use-router";
import { useSearchParams } from "@/hooks/use-search-params";
import { useAuthContext } from "../context/auth-provider";
import { LoadingSpinner } from "@/components/loading-spinner";

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") || paths.quizes.root;

  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace(returnTo);
    }
  }, [router, loading, authenticated, returnTo]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (authenticated) {
    return null;
  }

  return <>{children}</>;
}
