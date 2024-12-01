"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useSuppliers } from "@/hooks/useSupplier";
import { useState } from "react";
import { SupplierService } from "@/core/services/supplier.service";

// Validation schema with Zod
const supplierSchema = z.object({
  nameContact: z.string().min(1, { message: "Name Contact is required" }),
  email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  companyName: z.string().min(1, { message: "Company Name is required" }),
  ruc: z.string().min(1, { message: "RUC is required" }),
});

export function CreateSupplierForm() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch, isLoading } = useSuppliers();

  const form = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      nameContact: "",
      email: "",
      phone: "",
      companyName: "",
      ruc: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof supplierSchema>) => {
    try {
      await SupplierService.createSupplier({
        nameContact: values.nameContact,
        email: values.email,
        phone: values.phone,
        companyName: values.companyName,
        ruc: values.ruc,
      });

      toast({
        variant: "default",
        title: "Proveedor creado exitosamente",
      });

      form.reset();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear un proveedor",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al crear un proveedor",
      });
      throw error;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Añadir Proveedor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Crear Proveedor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                name="nameContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre del contacto" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.nameContact?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el correo electrónico" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el teléfono" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre de la empresa" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.companyName?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="ruc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RUC</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el RUC" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.ruc?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Creando Proveedor
                  </>
                ) : (
                  <span>Crear Proveedor</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
