import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { OrderService } from "@/core/services/order.service";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DeleteOrderFormProps {
  id: number | undefined;
  onClose: () => void;
}

export function DeleteOrderForm({ id, onClose }: DeleteOrderFormProps) {
  const { toast } = useToast();
  const { refetch } = useOrders();
  const { refetch: refetchProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await OrderService.deleteOrder(id!);

      toast({
        variant: "default",
        title: "Compra eliminada exitosamente",
      });

      form.reset();
      refetch();
      refetchProducts();
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
          <AlertDialogTitle>Estás seguro que deseas eliminar la venta con ID {id}?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Venta
              </>
            ) : (
              <span>Eliminar Venta</span>
            )}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}
