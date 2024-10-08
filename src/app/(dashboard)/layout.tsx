"use client";

import { ReactNode } from "react";
import Sidebar, { SidebarItem } from "./components/sidebar";
import { ShoppingBasket, Gem, Package, TicketX, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/core/store/auth.store";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  const { user } = useAuthStore();

  const defaultUser = {
    id: 1,
    name: "Jhon",
    lastname: "Doe",
    dni: "12345678",
    role: "ADMIN",
  };

  const displayedUser = user || defaultUser;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar user={displayedUser}>
        <Link href="/">
          <SidebarItem icon={<Home size={20} />} text="Home" active={pathname === "/"} />
        </Link>
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
        {displayedUser.role === "ADMIN" && (
          <Link href="/user">
            <SidebarItem icon={<User size={20} />} text="Usuarios" active={pathname === "/user"} />
          </Link>
        )}
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
