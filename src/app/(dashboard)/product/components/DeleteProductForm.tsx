"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";

export function DeleteProductForm(props: { id: number }) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch, isLoading } = useProducts();

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      await ProductService.deleteProductById(props.id);

      toast({
        variant: "default",
        title: "Producto eliminado exitosamente",
      });

      form.reset();
      setIsDialogOpen(false);
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
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <span className="w-full d-block" onClick={(e) => e.stopPropagation()}>
          Eliminar
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>¿Seguro que quieres eliminar el producto con ID: {props.id}?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-2">
              <span>Esta acción no se podrá deshacer.</span>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Producto
                  </>
                ) : (
                  <span>Eliminar Producto</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
