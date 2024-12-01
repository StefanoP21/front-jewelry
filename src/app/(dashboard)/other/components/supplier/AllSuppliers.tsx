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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { DeleteSupplierForm } from "./DeleteSupplierForm";
import { UpdateSupplierForm } from "./UpdateSupplierForm";

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
      <CardContent className="w-full mx-auto max-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 text-center">ID</TableHead>
              <TableHead className="w-1/6 text-center">Nombre del Contacto</TableHead>
              <TableHead className="w-1/6 text-center">Correo Electrónico</TableHead>
              <TableHead className="w-1/6 text-center">Teléfono</TableHead>
              <TableHead className="w-1/6 text-center">Nombre de la Empresa</TableHead>
              <TableHead className="w-1/6 text-center">RUC</TableHead>
              <TableHead className="w-1/6 text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium text-center">{supplier.id}</TableCell>
                <TableCell className="font-medium text-center">{supplier.nameContact}</TableCell>
                <TableCell className="font-medium text-center">{supplier.email}</TableCell>
                <TableCell className="font-medium text-center">{supplier.phone}</TableCell>
                <TableCell className="font-medium text-center">{supplier.companyName}</TableCell>
                <TableCell className="font-medium text-center">{supplier.ruc}</TableCell>
                <TableCell className="text-center">
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
      </CardContent>

      {/* Dialog for Edit Supplier */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
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
            <p>Seleccione un proveedor para editar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Supplier */}
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
