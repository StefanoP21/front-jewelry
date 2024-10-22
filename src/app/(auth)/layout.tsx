"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/core/store/auth.store";
import { FullScreenLoader } from "../(dashboard)/components/loader";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { status, checkAuthStatus } = useAuthStore();

  if (status === "loading") {
    checkAuthStatus();
    return <FullScreenLoader />;
  }

  if (status === "authenticated") {
    redirect("/order");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
