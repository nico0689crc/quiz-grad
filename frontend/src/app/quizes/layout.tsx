import { AuthGuard } from "@/components/auth/guard";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
