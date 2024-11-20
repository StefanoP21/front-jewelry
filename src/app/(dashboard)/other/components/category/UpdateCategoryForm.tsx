"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/core/models";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { CategoryService } from "@/core/services/category.service";

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

interface UpdateCategoryForm {
  category: Category;
  onClose: () => void;
}

export function UpdateCategoryForm({ category, onClose }: UpdateCategoryForm) {
  const { toast } = useToast();
  const { refetch } = useCategories();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      setIsLoading(true);
      await CategoryService.updateCategoryById(Number(category.id), {
        name: values.name,
      });

      toast({
        variant: "default",
        title: "Categoría actualizada exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al actualizar una categoría",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al actualizar una categoría",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <h2 className="text-lg font-semibold leading-none tracking-tight">Editar Categoría</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          {/* Primera fila: Name y Description */}
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre del producto" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Categoría
            </>
          ) : (
            <span>Actualizar Categoría</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
