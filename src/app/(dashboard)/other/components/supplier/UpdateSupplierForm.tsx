"use client";

import { Supplier } from "@/core/models";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useState } from "react";
import { SupplierService } from "@/core/services/supplier.service";

// Esquema de validación con Zod
const supplierSchema = z.object({
  nameContact: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phone: z.string().regex(/^[0-9]{9}$/, { message: "Phone number is required" }), //length(9, { message: "Phone number is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  ruc: z.string().regex(/^(10|15|16|17|20)\d{9}$/, { message: "RUC is required" }), //.length(11, { message: "RUC is required" }),
});

interface UpdateSupplierFormProps {
  supplier: Supplier;
  onClose: () => void;
}

export function UpdateSupplierForm({ supplier, onClose }: UpdateSupplierFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useSuppliers();

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
    setIsLoading(true);
    try {
      await SupplierService.UpdateSupplierById(supplier.id, values);

      toast({
        variant: "default",
        title: "Proveedor registrado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al Actualizar un proveedor",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al actualizar un proveedor",
      });
      throw error;
    }
    setIsLoading(false);
    onClose();
  };

  return (
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

          <div className="space-y-1"></div>
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
                  <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Proveedor
                </>
              ) : (
                <span>Actualizar proveedor</span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
