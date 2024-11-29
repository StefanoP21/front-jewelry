"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useSuppliers } from "@/hooks/useSuppliers";
import { SupplierService } from "@/core/services/supplier.service";

interface DeleteSupplierFormProps {
  id: number;
  onClose: () => void; // Añade el prop para cerrar el diálogo
}

export function DeleteSupplierForm({ id, onClose }: DeleteSupplierFormProps) {
  const { toast } = useToast();
  const { refetch } = useSuppliers();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await SupplierService.deleteSupplierById(id);

      toast({
        variant: "default",
        title: "Proveedor eliminado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al eliminar un proveedor",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un proveedor",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Eliminar Proveedor con ID {id}?</h2>
        <div className="grid gap-4 py-2">
          <span>Esta acción no se podrá deshacer.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Proveedor
            </>
          ) : (
            <span>Eliminar Proveedor</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
