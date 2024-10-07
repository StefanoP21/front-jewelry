"use client";

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { User } from "@/core/models";

interface SidebarContextType {
   expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
   children: ReactNode;
   user: User;
}

export default function Sidebar({ children, user }: SidebarProps) {
   const [expanded, setExpanded] = useState(true);

   return (
      <aside className="h-screen">
         <nav className="h-full flex flex-col bg-white border-r shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center">
               <Image
                  src="https://img.logoipsum.com/243.svg"
                  width={128}
                  height={64}
                  className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                     }`}
                  alt="Logo"
               />
               <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
               >
                  {expanded ? <ChevronFirst /> : <ChevronLast />}
               </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
               <ul className="flex-1 px-3">{children}</ul>
            </SidebarContext.Provider>

            <div className="border-t flex p-3">
               <Avatar name={user.name} />
               <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                     }`}
               >
                  <div className="leading-4">
                     <h4 className="font-semibold">{user.name + " " + user.lastname}</h4>
                     <span className="text-xs text-gray-600">{user.dni}</span>
                  </div>
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <MoreVertical size={20} />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Actualizar Datos</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

               </div>
            </div>
         </nav>
      </aside>
   );
}

interface SidebarItemProps {
   icon: ReactNode;
   text: string;
   active?: boolean;
   alert?: boolean;
}

export function SidebarItem({ icon, text, active = false, alert = false }: SidebarItemProps) {
   const context = useContext(SidebarContext);

   if (!context) {
      throw new Error("SidebarItem must be used within a Sidebar");
   }

   const { expanded } = context;

   return (
      <li
         className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
            }`}
      >
         {icon}
         <span
            className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
               }`}
         >
            {text}
         </span>
         {alert && (
            <div
               className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                  }`}
            />
         )}

         {!expanded && (
            <div
               className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
               {text}
            </div>
         )}
      </li>
   );
}

interface AvatarProps {
   name: string;
}

const Avatar = ({ name }: AvatarProps) => {
   const initial = name.charAt(0).toUpperCase();

   return (
      <div
         className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold"
         style={{ backgroundColor: "#c7d2fe", color: "#3730a3" }}
      >
         {initial}
      </div>
   );
};