import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/core/models";
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
import { DeleteCategoryForm } from "./DeleteCategoryForm";
import { UpdateCategoryForm } from "./UpdateCategoryForm";

interface AllCategoriesProps {
  categories: Category[];
}

export default function AllCategories({ categories }: AllCategoriesProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleEditOpen = (id: number) => {
    setSelectedCategoryId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedCategoryId(id);
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-center w-1/3">{category.id}</TableCell>
                <TableCell className="font-medium text-center w-1/3">{category.name}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditOpen(Number(category.id))}>
                        Actualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteOpen(Number(category.id))}>
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

      {/* Dialog for Edit Product */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {selectedCategoryId !== null ? (
            <>
              {categories.find((c) => Number(c.id) === selectedCategoryId) ? (
                <UpdateCategoryForm
                  category={categories.find((c) => Number(c.id) === selectedCategoryId)!}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              ) : (
                <p>Categoría no encontrada.</p>
              )}
            </>
          ) : (
            <p>Seleccione una categoría para editar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Product */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedCategoryId && (
            <DeleteCategoryForm id={selectedCategoryId} onClose={() => setIsDeleteDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
