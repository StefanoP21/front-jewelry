"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SupplierService } from "@/core/services/supplier.service"; // Changed from CategoryService to SupplierService
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useSuppliers } from "@/hooks/useSupplier"; // Changed from useCategories to useSuppliers

interface DeleteSupplierFormProps {
  id: number;
  onClose: () => void; // Prop to close the dialog
}

export function DeleteSupplierForm({ id, onClose }: DeleteSupplierFormProps) {
  const { toast } = useToast();
  const { refetch } = useSuppliers(); // Changed from useCategories to useSuppliers
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await SupplierService.deleteSupplierById(id); // Changed from deleteCategoryById to deleteSupplierById

      toast({
        variant: "default",
        title: "Proveedor eliminado exitosamente", // Changed from "Categoría" to "Proveedor"
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al eliminar un proveedor", // Changed from "Categoría" to "Proveedor"
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un proveedor", // Changed from "Categoría" to "Proveedor"
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Eliminar Proveedor con ID {id}?</h2>{" "}
        {/* Changed from "Categoría" to "Proveedor" */}
        <div className="grid gap-4 py-2">
          <span>Esta acción no se podrá deshacer.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Proveedor{" "}
              {/* Changed from "Categoría" to "Proveedor" */}
            </>
          ) : (
            <span>Eliminar Proveedor</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
