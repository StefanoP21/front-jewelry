import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Customer } from "@/core/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Avatar from "../../components/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { UpdateCustomerForm } from "./UpdateCustomerForm";
import { DeleteCustomerForm } from "./DeleteCustomerForm";

interface AllCustomersProps {
  customers: Customer[];
}

export default function AllCustomers({ customers }: AllCustomersProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const handleEditOpen = (id: number) => {
    setSelectedCustomerId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedCustomerId(id);
    setIsDeleteDialogOpen(true);
  };

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
              <TableHead className="md:table-cell">Teléfono</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar name={customer.name} />
                </TableCell>
                <TableCell className="font-medium w-[300px]">
                  {customer.name} {customer.lastName}
                </TableCell>
                <TableCell className="w-[300px]">
                  <Badge variant="outline">{customer.dni}</Badge>
                </TableCell>
                <TableCell className="w-[300px]">{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditOpen(Number(customer.id))}>
                        Actualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteOpen(Number(customer.id))}>
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {selectedCustomerId !== null ? (
            <>
              {customers.find((p) => Number(p.id) === selectedCustomerId) ? (
                <UpdateCustomerForm
                  customer={customers.find((p) => Number(p.id) === selectedCustomerId)!}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              ) : (
                <p>Cliente no encontrado</p>
              )}
            </>
          ) : (
            <p>Seleccione un cliente para editar</p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedCustomerId && (
            <DeleteCustomerForm id={selectedCustomerId} onClose={() => setIsDeleteDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
