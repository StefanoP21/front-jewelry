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
import { RefundService } from "@/core/services/refund.service";
import { useToast } from "@/hooks/use-toast";
import { useRefunds } from "@/hooks/useRefunds";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DeleteRefundFormProps {
  id: number | undefined;
  onClose: () => void;
}

export function DeleteRefundForm({ id, onClose }: DeleteRefundFormProps) {
  const { toast } = useToast();
  const { refetch } = useRefunds();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await RefundService.deleteRefund(id!);

      toast({
        variant: "default",
        title: "Devolución eliminada exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar una devolución",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar una devolución",
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
          <AlertDialogTitle>Estás seguro que deseas eliminar la devolución con ID {id}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Devolución
              </>
            ) : (
              <span>Eliminar Devolución</span>
            )}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
