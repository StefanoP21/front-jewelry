"use client";

import { ReactNode } from "react";
import Sidebar, { SidebarItem } from "./components/sidebar";
import { ShoppingBasket, Gem, Package, TicketX, User } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useAuthStore } from "@/core/store/auth.store";
import { FullScreenLoader } from "./components/loader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const { user, status, checkAuthStatus } = useAuthStore();

  if (status === "loading") {
    checkAuthStatus();
    return <FullScreenLoader />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar user={user!}>
        <Link href="/order">
          <SidebarItem icon={<ShoppingBasket size={20} />} text="Ventas" active={pathname === "/order"} />
        </Link>
        <Link href="/product">
          <SidebarItem icon={<Gem size={20} />} text="Productos" active={pathname === "/product"} />
        </Link>
        <Link href="/purchase">
          <SidebarItem icon={<Package size={20} />} text="Compras" active={pathname === "/purchase"} />
        </Link>
        <Link href="/refund">
          <SidebarItem icon={<TicketX size={20} />} text="Devoluciones" active={pathname === "/refund"} />
        </Link>
        {user?.role === "ADMIN" && (
          <Link href="/user">
            <SidebarItem icon={<User size={20} />} text="Usuarios" active={pathname === "/user"} />
          </Link>
        )}
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
