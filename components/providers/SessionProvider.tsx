"use client";
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import React from 'react';

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const SessionProvider = ({ children }: ProviderProps) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
