import { DeleteUserForm } from "@/app/(dashboard)/user/components/DeleteUserForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Data } from "@/core/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Avatar from "../../components/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AllUsersProps {
  users: Data[];
  filtered?: "active" | "inactive";
}

export default function AllUsers({ users, filtered }: AllUsersProps) {
  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Imagen</span>
              </TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>DNI</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell text-center">Rol</TableHead>
              {!filtered && <TableHead className="hidden md:table-cell">Estado</TableHead>}
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          <Table>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar name={user.user.name} color={user.user.status} />
                  </TableCell>
                  <TableCell className="font-medium w-[300px]">
                    {user.user.name} {user.user.lastname}
                  </TableCell>
                  <TableCell className="w-[300px]">
                    <Badge variant="outline">{user.user.dni}</Badge>
                  </TableCell>
                  <TableCell className="w-[250px]">{user.user.email}</TableCell>
                  <TableCell className="text-center">
                    {(() => {
                      switch (user.user.role) {
                        case "ADMIN":
                          return <>Administrador</>;
                        case "USER":
                          return <>Usuario</>;
                        default:
                          return <>Desconocido</>;
                      }
                    })()}
                  </TableCell>
                  {!filtered && (
                    <TableCell className="hidden md:table-cell">
                      <Badge className={user.user.status ? "text-lime-600" : "text-red-600"} variant="secondary">
                        {user.user.status ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mostrar el menú</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <DeleteUserForm id={user.user.id} status={user.user.status} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </>
  );
}
