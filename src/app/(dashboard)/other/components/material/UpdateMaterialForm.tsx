"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useMaterials } from "@/hooks/useMaterials";
import { Material } from "@/core/models";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { MaterialService } from "@/core/services/material.service";

const materialSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

interface UpdateMaterialForm {
  material: Material;
  onClose: () => void;
}

export function UpdateMaterialForm({ material, onClose }: UpdateMaterialForm) {
  const { toast } = useToast();
  const { refetch } = useMaterials();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: material.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof materialSchema>) => {
    try {
      setIsLoading(true);
      await MaterialService.updateMaterialById(Number(material.id), {
        name: values.name,
      });

      toast({
        variant: "default",
        title: "Material actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al actualizar un material",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al actualizar un material",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <h2 className="text-lg font-semibold leading-none tracking-tight">Editar Material</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre del material" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Material
            </>
          ) : (
            <span>Actualizar Material</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
