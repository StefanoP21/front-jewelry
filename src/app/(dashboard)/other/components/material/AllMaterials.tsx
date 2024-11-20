import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Material } from "@/core/models";
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
import { DeleteMaterialForm } from "./DeleteMaterialForm";
import { UpdateMaterialForm } from "./UpdateMaterialForm";

interface AllMaterialsProps {
  materials: Material[];
}

export default function AllMaterials({ materials }: AllMaterialsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

  const handleEditOpen = (id: number) => {
    setSelectedMaterialId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedMaterialId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium w-[200px]">{material.id}</TableCell>
                <TableCell className="font-medium w-[200px]">{material.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditOpen(Number(material.id))}>
                        Actualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteOpen(Number(material.id))}>
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

      {/* Dialog for Edit Material */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {selectedMaterialId !== null ? (
            <>
              {materials.find((m) => Number(m.id) === selectedMaterialId) ? (
                <UpdateMaterialForm
                  material={materials.find((m) => Number(m.id) === selectedMaterialId)!}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              ) : (
                <p>Material no encontrado.</p>
              )}
            </>
          ) : (
            <p>Seleccione un material para editar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Material */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedMaterialId && (
            <DeleteMaterialForm id={selectedMaterialId} onClose={() => setIsDeleteDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
