"use client";

import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  readonly children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider refetchInterval={0}>{children}</SessionProvider>;
}
