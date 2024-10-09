"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/core/store/auth.store";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { status, checkAuthStatus } = useAuthStore();

  if (status === "loading") {
    checkAuthStatus();
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/order");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
