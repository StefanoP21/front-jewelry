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

// Esquema de validación con Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.enum(["1", "2", "3"], { required_error: "Category is required" }),
  image: z.string().url({ message: "Invalid URL" }).optional(),
  material: z.string().min(1, { message: "Material is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  stock: z.string().min(1, { message: "Stock is required" }),
});

export function CreateProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema), // Resolver de zod
    defaultValues: {
      name: "",
      description: "",
      categoryId: "1",
      image: "",
      material: "",
      price: "0",
      stock: "0",
    },
  });

  /*const onSubmit = (data: any) => {
    console.log(data);
  };*/

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form /*onSubmit={form.handleSubmit(onSubmit)}*/>
            <div className="grid gap-4 py-4">
              {/* Primera fila: Name y Description */}
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="h-32 w-full rounded-md border border-input bg-background p-2 text-sm shadow-sm resize-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter description"
                        {...field}
                      />
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
                      <FormLabel>Category ID</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Category 1</SelectItem>
                            <SelectItem value="2">Category 2</SelectItem>
                            <SelectItem value="3">Category 3</SelectItem>
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
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
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
                        <Input placeholder="Enter material" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.material?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} />
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
                        <Input type="number" placeholder="Enter stock quantity" {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.stock?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
