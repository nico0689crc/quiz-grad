"use client";

import { GuestGuard } from "@/components/auth/guard";
import AuthLayout from "@/layouts/auth/auth-layout";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
};

export default Layout;
