import React, { FC, PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 1,
    },
  },
});

const RootBody: FC<PropsWithChildren<{}>> = ({ children }) => {
  const style = cn("h-screen w-screen overflow-hidden");

  return (
    <body className={style}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>{children}</HydrationBoundary>
      </QueryClientProvider>
    </body>
  );
};

export default RootBody;
