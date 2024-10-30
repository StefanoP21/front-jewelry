"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";

interface DeleteProductFormProps {
  id: number;
  onClose: () => void; // Añade el prop para cerrar el diálogo
}

export function DeleteProductForm({ id, onClose }: DeleteProductFormProps) {
  const { toast } = useToast();
  const { refetch, isLoading } = useProducts();

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      await ProductService.deleteProductById(id);

      toast({
        variant: "default",
        title: "Producto eliminado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar un producto",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un producto",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Eliminar Producto con ID {id}?</h2>
        <div className="grid gap-4 py-2">
          <span>Esta acción no se podrá deshacer.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Producto
            </>
          ) : (
            <span>Eliminar Producto</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
