"use client";

import { AuthContext } from "./auth-context";

export const AuthConsumer = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (!auth.loading ? children : null)}
    </AuthContext.Consumer>
  );
};
