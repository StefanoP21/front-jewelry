"use client";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PurchaseService } from "@/core/services/purchase.service";
import { useToast } from "@/hooks/use-toast";
import { usePurchases } from "@/hooks/usePurchases";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DeletePurchaseFormProps {
  id: number | undefined;
  onClose: () => void;
}

export function DeletePurchaseForm({ id, onClose }: DeletePurchaseFormProps) {
  const { toast } = useToast();
  const { refetch } = usePurchases();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await PurchaseService.deletePurchase(id!);

      toast({
        variant: "default",
        title: "Compra eliminada exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar una compra",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar una compra",
      });
      throw error;
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle>Estás seguro que deseas eliminar la compra con ID {id}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Compra
              </>
            ) : (
              <span>Eliminar Compra</span>
            )}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
