"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MaterialService } from "@/core/services/material.service";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMaterials } from "@/hooks/useMaterials";

interface DeleteMaterialFormProps {
  id: number;
  onClose: () => void;
}

export function DeleteMaterialForm({ id, onClose }: DeleteMaterialFormProps) {
  const { toast } = useToast();
  const { refetch } = useMaterials();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await MaterialService.deleteMaterialById(id);

      toast({
        variant: "default",
        title: "Material eliminado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al eliminar un material",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un material",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold leading-none tracking-tight">Eliminar Material con ID {id}?</h2>
        <div className="grid gap-4 py-2">
          <span>Esta acción no se podrá deshacer.</span>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Eliminando Material
            </>
          ) : (
            <span>Eliminar Material</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
