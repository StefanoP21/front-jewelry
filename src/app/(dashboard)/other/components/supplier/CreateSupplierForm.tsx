"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LoaderCircle, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useState } from "react";
import { SupplierService } from "@/core/services/supplier.service";

// Esquema de validación con Zod
const supplierSchema = z.object({
  nameContact: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phone: z.string().min(9, { message: "Phone number is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
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
      await SupplierService.createSupplier(values);

      toast({
        variant: "default",
        title: "Proveedor registrado exitosamente",
      });

      form.reset();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al registrar un proveedor",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al registrar un proveedor",
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
          <DialogTitle>Registrar Proveedor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                name="nameContact"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contacto</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        placeholder="Ingrese el nombre del contacto"
                        className="mt-1 block w-full p-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        placeholder="Ingrese el Email del contacto"
                        className="mt-1 block w-full p-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-1">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="tel"
                          placeholder="Ingrese el teléfono del contacto"
                          className="mt-1 block w-full p-2 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1">
                <FormField
                  name="companyName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          placeholder="Ingrese nombre de la empresa proveedora"
                          className="mt-1 block w-full p-2 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1">
                <FormField
                  name="ruc"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RUC</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          maxLength={11}
                          placeholder="Ingrese el RUC"
                          className="mt-1 block w-full p-2 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Registrando Proveedor
                    </>
                  ) : (
                    <span>Registrar Proveedor</span>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
