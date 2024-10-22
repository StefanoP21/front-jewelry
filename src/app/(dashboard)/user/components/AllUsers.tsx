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

interface AllUsersProps {
  users: Data[];
}

export default function AllUsers({ users }: AllUsersProps) {
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
              <TableHead className="hidden md:table-cell">Rol</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.user.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar name={user.user.name} />
                </TableCell>
                <TableCell className="font-medium w-[300px]">
                  {user.user.name} {user.user.lastname}
                </TableCell>
                <TableCell className="w-[300px]">
                  <Badge variant="outline">{user.user.dni}</Badge>
                </TableCell>
                <TableCell className="w-[300px]">{user.user.email}</TableCell>
                <TableCell>{user.user.role}</TableCell>
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
                        <DeleteUserForm id={user.user.id} dni={user.user.dni} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
