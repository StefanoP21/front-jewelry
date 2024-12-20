"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useMaterials } from "@/hooks/useMaterials";

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  image: z.string().url({ message: "Invalid URL" }).optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
});

export function CreateProductForm() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch, isLoading } = useProducts();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      image: "",
      materialId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      await ProductService.createProduct({
        name: values.name,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        image: values.image,
        materialId: parseInt(values.materialId),
      });

      toast({
        variant: "default",
        title: "Producto creado exitosamente",
      });

      form.reset();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear un producto",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al crear un producto",
      });
      throw error;
    }
  };

  const { categories } = useCategories();
  const { materials } = useMaterials();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Añadir Producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Crear Producto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
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
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ingrese la descripción" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Segunda fila: Category ID y Image */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione la categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{form.formState.errors.categoryId?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagen</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese la URL de la imagen" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.image?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Tercera fila: Material y Price */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="materialId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione el material" />
                          </SelectTrigger>
                          <SelectContent>
                            {materials.map((material) => (
                              <SelectItem key={material.id} value={material.id.toString()}>
                                {material.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>{form.formState.errors.materialId?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Creando Producto
                  </>
                ) : (
                  <span>Crear Producto</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
