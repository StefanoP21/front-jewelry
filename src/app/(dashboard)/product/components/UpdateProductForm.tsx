"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { materials } from "@/core/constants";
import { Product } from "@/core/models";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  image: z.string().url({ message: "Invalid URL" }).optional(),
  material: z.string().min(1, { message: "Material is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
});

interface UpdateProductForm {
  product: Product;
  onClose: () => void;
}

export function UpdateProductForm({ product, onClose }: UpdateProductForm) {
  const { toast } = useToast();
  const { refetch, isLoading } = useProducts();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      categoryId: product.category.id.toString(),
      image: product.image,
      material: product.material,
      price: product.price,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      await ProductService.updateProductById(Number(product.id), {
        name: values.name,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        image: values.image,
        material: values.material,
        price: values.price,
      });

      toast({
        variant: "default",
        title: "Producto actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al actualizar un producto",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al actualizar un producto",
      });
      throw error;
    }
    onClose();
  };

  const { categories } = useCategories();

  return (
    <Form {...form}>
      <h2 className="text-lg font-semibold leading-none tracking-tight">Editar Producto</h2>
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
                  <FormMessage>{form.formState.errors.material?.message}</FormMessage>
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
              name="material"
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
                          <SelectItem key={material.id} value={material.name}>
                            {material.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{form.formState.errors.material?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name="price"
              disabled={product.price == 0}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese el precio"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Producto
            </>
          ) : (
            <span>Actualizar Producto</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
