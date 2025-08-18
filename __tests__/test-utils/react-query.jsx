import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false} },
  })
  return function Wrapper({ children }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}