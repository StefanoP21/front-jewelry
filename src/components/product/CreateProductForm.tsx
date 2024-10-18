"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { ProductService } from "@/core/services/product.service";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useCategoryStore } from "@/core/store/category.store";

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z
    .string()
    .min(1, { message: "Category is required" })
    .transform((val) => Number(val)),
  image: z.string().url({ message: "Invalid URL" }).optional(),
  material: z.string().min(1, { message: "Material is required" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((val) => Number(val)),
  stock: z
    .string()
    .min(1, { message: "Stock is required" })
    .transform((val) => Number(val)),
});

export function CreateProductForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(productSchema), // Resolver de zod
    defaultValues: {
      name: "",
      description: "",
      categoryId: 1,
      image: "",
      material: "",
      price: 0,
      stock: 0,
    },
  });

  const { categories, setAllCategories } = useCategoryStore((state) => state);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      ProductService.createProduct({
        ...values,
        categoryId: Number(values.categoryId),
        price: Number(values.price),
        stock: Number(values.stock),
      });
      toast({
        variant: "default",
        title: "Producto creado exitosamente",
      });
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

  useEffect(() => {
    setAllCategories();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Añadir Producto</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                      <Input placeholder="Ingrese la descripción" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Segunda fila: Category ID y Image */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="categoryId"
                  render={() => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Select defaultValue="default">
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione la categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem disabled value="default">
                              Seleccione la categoría
                            </SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={String(category.id)}>
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
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el material" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.material?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ingrese el precio" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Cuarta fila: Stock */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ingrese el stock" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.stock?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
