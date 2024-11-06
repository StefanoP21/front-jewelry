import { DeleteProductForm } from "@/app/(dashboard)/product/components/DeleteProductForm";
import { UpdateProductForm } from "@/app/(dashboard)/product/components/UpdateProductForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/core/models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface AllProductsProps {
  products: Product[];
}

export default function AllProducts({ products }: AllProductsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleEditOpen = (id: number) => {
    setSelectedProductId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (id: number) => {
    setSelectedProductId(id);
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
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Descripción</TableHead>
              <TableHead className="hidden md:table-cell">Categoría</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={product.description}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium w-[200px]">{product.name}</TableCell>
                <TableCell className="hidden md:table-cell w-[400px]">{product.description}</TableCell>
                <TableCell className="hidden md:table-cell">{product.category.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.material}</Badge>
                </TableCell>
                <TableCell>{parseFloat(product.price.toString()).toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEditOpen(Number(product.id))}>Actualizar</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteOpen(Number(product.id))}>Eliminar</DropdownMenuItem>
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
          {selectedProductId !== null ? (
            <>
              {products.find((p) => Number(p.id) === selectedProductId) ? (
                <UpdateProductForm
                  product={products.find((p) => Number(p.id) === selectedProductId)!}
                  onClose={() => setIsEditDialogOpen(false)}
                />
              ) : (
                <p>Producto no encontrado.</p>
              )}
            </>
          ) : (
            <p>Seleccione un producto para editar.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog for Delete Product */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          {selectedProductId && (
            <DeleteProductForm id={selectedProductId} onClose={() => setIsDeleteDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
