"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useSuppliers } from "@/hooks/useSupplier";
import { Supplier } from "@/core/models";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
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

interface UpdateSupplierFormProps {
  supplier: Supplier;
  onClose: () => void;
}

export function UpdateSupplierForm({ supplier, onClose }: UpdateSupplierFormProps) {
  const { toast } = useToast();
  const { refetch } = useSuppliers();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      nameContact: supplier.nameContact,
      email: supplier.email,
      phone: supplier.phone,
      companyName: supplier.companyName,
      ruc: supplier.ruc,
    },
  });

  const onSubmit = async (values: z.infer<typeof supplierSchema>) => {
    try {
      setIsLoading(true);
      await SupplierService.updateSupplierById(Number(supplier.id), {
        nameContact: values.nameContact,
        email: values.email,
        phone: values.phone,
        companyName: values.companyName,
        ruc: values.ruc,
      });

      toast({
        variant: "default",
        title: "Proveedor actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al actualizar un proveedor",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al actualizar un proveedor",
      });
      throw error;
    }
    onClose();
  };

  return (
    <Form {...form}>
      <h2 className="text-lg font-semibold leading-none tracking-tight">Editar Proveedor</h2>
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Proveedor
            </>
          ) : (
            <span>Actualizar Proveedor</span>
          )}
        </Button>
      </form>
    </Form>
  );
}
