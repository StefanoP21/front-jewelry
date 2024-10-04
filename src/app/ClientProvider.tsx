"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ClientProviderProps {
    children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
