"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import { useCategories } from "@/hooks/useCategories";
import { materials } from "@/core/constants";

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  image: z.string().url({ message: "Invalid URL" }).optional(),
  material: z.string().min(1, { message: "Material is required" }),
  price: z.number().min(0.01, { message: "Price is required" }),
});

export function UpdateProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      image: "",
      material: "",
      price: 0,
    },
  });

  /*const onSubmit = (data: any) => {
    console.log(data);
  };*/

  const { categories } = useCategories();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full d-block" onClick={(e) => e.stopPropagation()}>
          Editar
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form /*onSubmit={form.handleSubmit(onSubmit)}*/>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ingrese el precio"
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(isNaN(value) ? "" : value); // Convertir a número o dejar vacío
                          }}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
