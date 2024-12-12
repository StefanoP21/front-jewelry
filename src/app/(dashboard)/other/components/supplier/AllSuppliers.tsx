import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Supplier } from "@/core/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteSupplierForm } from "./DeleteSupplierForm";
import { UpdateSupplierForm } from "./UpdateSupplierForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AllSuppliersProps {
  suppliers: Supplier[];
}

export default function AllSuppliers({ suppliers }: AllSuppliersProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  const handleEditOpen = (id: number) => {
    setSelectedSupplierId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedSupplierId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RUC</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefono</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          <Table>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className=" w-[300px] font-bold">{supplier.ruc}</TableCell>
                  <TableCell className=" w-[550px]">{supplier.companyName}</TableCell>
                  <TableCell className=" w-[300px]">{supplier.nameContact}</TableCell>
                  <TableCell className=" w-[300px]">{supplier.email}</TableCell>
                  <TableCell className=" w-[300px]">
                    <Badge variant="outline">{supplier.phone}</Badge>
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditOpen(Number(supplier.id))}>
                          Actualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteOpen(Number(supplier.id))}>
                          Eliminar
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

      {/* Dialog for Edit Product */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Proveedor</DialogTitle>
          </DialogHeader>
          {selectedSupplierId !== null ? (
            <>
              {suppliers.find((s) => Number(s.id) === selectedSupplierId) ? (
                <UpdateSupplierForm
                  supplier={suppliers.find((s) => Number(s.id) === selectedSupplierId)!}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              ) : (
                <p>Proveedor no encontrado.</p>
              )}
            </>
          ) : (
            <p>Seleccione una proveedor para editar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Product */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedSupplierId && (
            <DeleteSupplierForm id={selectedSupplierId} onClose={() => setIsDeleteDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
