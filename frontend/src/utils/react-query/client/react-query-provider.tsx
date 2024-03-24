import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface QueryProviderProps {}

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren<QueryProviderProps>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
