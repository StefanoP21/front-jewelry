import { MoreVertical, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/core/store/auth.store";
import { useRouter } from "next/navigation";

export default function SidebarOptions() {
  const { setTheme } = useTheme();
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ajustes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <div className="flex">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="ml-2">Cambiar Tema</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>Cambia la contraseña de la cuenta de usuario actual.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="password" className="text-right">
                Contraseña actual:
              </Label>
              <Input id="password" type="password" placeholder="********" className="col-span-3" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-right">
                Contraseña nueva:
              </Label>
              <Input id="password" type="password" placeholder="********" className="col-span-3" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-right">
                Repetir contraseña nueva:
              </Label>
              <Input id="password" type="password" placeholder="********" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
