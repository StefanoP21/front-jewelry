"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";

interface DeleteProductFormProps {
  id: number;
  status: boolean;
  onClose: () => void;
}

export function DeleteProductForm({ id, status, onClose }: DeleteProductFormProps) {
  const { toast } = useToast();
  const { refetch } = useProducts();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const product = await ProductService.getProductById(id);

      await ProductService.updateProductById(id, {
        name: product.data.name,
        description: product.data.description,
        categoryId: product.data.category.id,
        image: product.data.image,
        materialId: product.data.material.id,
        price: product.data.price,
        status: !product.data.status,
      });

      toast({
        variant: "default",
        title: "Estado actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al actualizar el estado",
        description: (error as AxiosError<{ message: string }>)?.response?.data?.message || "Ocurrió un error",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          {status ? `Eliminar Producto con ID ${id}?` : `Habilitar Producto con ID ${id}?`}
        </h2>
        <div className="grid gap-4 py-2">
          <span>Esta acción afectará al producto seleccionado.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" />{" "}
              {status ? "Elimando Producto" : "Habilitando Producto"}
            </>
          ) : (
            <span>{status ? "Eliminar Producto" : "Habilitar Producto"}</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
