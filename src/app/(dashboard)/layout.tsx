"use client";

import { ReactNode } from "react";
import Sidebar, { SidebarItem } from "@/components/ui/sidebar";
import { ShoppingBasket, Gem, Package, TicketX, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User as UserModel } from "@/core/models";

interface DashboardLayoutProps {
   children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   const pathname = usePathname();

   const user: UserModel = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {
      id: 1,
      name: "Jhon",
      lastname: "Doe",
      dni: "12345678",
      role: "ADMIN"
   }

   return (
      <div className="flex">
         {/* Sidebar */}
         <Sidebar user={user}>
            <Link href="/">
               <SidebarItem
                  icon={<Home size={20} />}
                  text="Home"
                  active={pathname === "/"}
               />
            </Link>
            <Link href="/order">
               <SidebarItem
                  icon={<ShoppingBasket size={20} />}
                  text="Ventas"
                  active={pathname === "/order"}
               />
            </Link>
            <Link href="/product">
               <SidebarItem
                  icon={<Gem size={20} />}
                  text="Productos"
                  active={pathname === "/product"}
               />
            </Link>
            <Link href="/purchase">
               <SidebarItem
                  icon={<Package size={20} />}
                  text="Compras"
                  active={pathname === "/purchase"}
               />
            </Link>
            <Link href="/refunds">
               <SidebarItem
                  icon={<TicketX size={20} />}
                  text="Devoluciones"
                  active={pathname === "/refunds"}
               />
            </Link>
            {
               user.role === "ADMIN" && (
                  <Link href="/user">
                     <SidebarItem
                        icon={<User size={20} />}
                        text="Usuarios"
                        active={pathname === "/user"}
                     />
                  </Link>
               )
            }
         </Sidebar>

         {/* Main Content */}
         <div className="flex-1 p-6">
            {children}
         </div>
      </div>
   );
};

export default DashboardLayout;
