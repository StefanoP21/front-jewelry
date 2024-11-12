"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { CustomerService } from "@/core/services/customer.service";

interface DeleteCustomerFormProps {
  id: number;
  onClose: () => void; // Añade el prop para cerrar el diálogo
}

export function DeleteCustomerForm({ id, onClose }: DeleteCustomerFormProps) {
  const { toast } = useToast();
  const { refetch } = useCustomers();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await CustomerService.deleteCustomerById(id);

      toast({
        variant: "default",
        title: "Cliente eliminado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al eliminar un cliente",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un cliente",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Eliminar Cliente con ID {id}?</h2>
        <div className="grid gap-4 py-2">
          <span>Esta acción no se podrá deshacer.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Cliente
            </>
          ) : (
            <span>Eliminar Cliente</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
