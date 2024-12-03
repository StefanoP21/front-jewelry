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
import { Product } from "@/core/models";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useMaterials } from "@/hooks/useMaterials";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const productSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    image: z.string().url({ message: "Invalid URL" }).optional(),
    materialId: z.string().min(1, { message: "Material is required" }),
    price: z.coerce.number().optional(),
    purchasePrice: z.coerce.number().min(0, { message: "Purchase price must be at least 0" }),
  })
  .refine(
    (data) => {
      if (data.price !== undefined && data.price < data.purchasePrice) {
        return false;
      }
      return true;
    },
    {
      message: "El precio debe ser mayor o igual al precio de compra",
      path: ["price"],
    },
  );

interface UpdateProductForm {
  product: Product;
  onClose: () => void;
}

export function UpdateProductForm({ product, onClose }: UpdateProductForm) {
  const { toast } = useToast();
  const { refetch } = useProducts();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      categoryId: product.category.id.toString(),
      image: product.image,
      materialId: product.material.id.toString(),
      price: product.price,
      purchasePrice: product.purchasePrice,
    },
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      setIsLoading(true);
      await ProductService.updateProductById(Number(product.id), {
        name: values.name,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        image: values.image,
        materialId: parseInt(values.materialId),
        price: values.price || 0,
      });

      toast({
        variant: "default",
        title: "Producto actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
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
  const { materials } = useMaterials();

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

            <TooltipProvider>
              <Tooltip>
                <FormField
                  name="price"
                  disabled={product.stock === 0}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <TooltipTrigger type="button">
                          <Input type="number" placeholder="Ingrese el precio" {...field} />
                        </TooltipTrigger>
                      </FormControl>
                      <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <TooltipContent side="top">
                  <p className="text-sm">Precio de compra: {product.purchasePrice}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
