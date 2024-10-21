"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ProductService } from "@/core/services/product.service";

const productSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

export function DeleteProductForm(props: { id: number }) {
  const form = useForm({
    resolver: zodResolver(productSchema), // Resolver de zod
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    ProductService.deleteProductById(Number(values.id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full d-block" onClick={(e) => e.stopPropagation()}>
          Delete
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product with ID {props.id}?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
