import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import Logo from "./logo";
import { User } from "@/core/models";
import Avatar from "./avatar";
import SidebarOptions from "./sidebar-options";

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
    <aside className="min-h-screen">
      <nav className="h-full flex flex-col bg-[hsl(var(--card))] border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Logo expanded={expanded} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center relative group">
          <Avatar name={user?.name} />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-full ml-3" : "w-0 ml-0"}`}
          >
            <div className="leading-4 mr-3">
              <h4 className="font-semibold text-[hsl(var(--foreground))] whitespace-nowrap">
                {user?.name + " " + user?.lastname}
              </h4>
              <span className="text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">{user?.dni}</span>
            </div>

            <SidebarOptions />
          </div>

          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-3 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}
              style={{ top: "50%", transform: "translateY(-50%)", maxWidth: "200px" }}
            >
              {user?.name + " " + user?.lastname}
            </div>
          )}
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
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          : "hover:bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
      }`}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-[hsl(var(--primary))] ${expanded ? "" : "top-2"}`} />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
