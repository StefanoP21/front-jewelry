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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <CardContent className="w-full mx-auto max-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 text-center">ID</TableHead>
              <TableHead className="w-1/3 text-center">Nombre</TableHead>
              <TableHead className="w-1/3 sr-only">Acciones</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          <Table>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium text-center w-1/3">{material.id}</TableCell>
                  <TableCell className="font-medium text-center w-1/3">{material.name}</TableCell>
                  <TableCell className="w-1/3 text-center">
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
          <ScrollBar />
        </ScrollArea>
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
