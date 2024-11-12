import { Customer } from "@/core/models";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useCustomers } from "@/hooks/useCustomers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerService } from "@/core/services/customer.service";
import { AxiosError } from "axios";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const customerSchema = z.object({
  name: z.string({ message: "El nombre es obligatorio" }),
  lastName: z.string({ message: "El apellido es obligatorio" }),
  dni: z.string().length(8, { message: "El DNI debe tener 8 caracteres" }),
  phone: z.string().length(9, { message: "El numero de teléfono debe tener 9 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
});

interface UpdateCustomerFormProps {
  customer: Customer;
  onClose: () => void;
}

export function UpdateCustomerForm({ customer, onClose }: UpdateCustomerFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useCustomers();

  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer.name,
      lastName: customer.lastName,
      dni: customer.dni,
      phone: customer.phone,
      email: customer.email,
    },
  });

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    setIsLoading(true);
    try {
      await CustomerService.updateCustomerById(customer.id, values);

      toast({
        variant: "default",
        title: "Cliente Actualizado exitosamente",
      });

      form.reset();
      refetch();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al Actualizar un cliente",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrio un error al actualizar un cliente",
      });
      throw error;
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-3">
          <div className="space-y-1">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Ingrese su nombre"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1"></div>
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Ingrese su apellido"
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1">
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
                      placeholder="Ingrese su email"
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
              name="dni"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Ingrese su DNI"
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
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      placeholder="Ingrese su teléfono"
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
                  <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Actualizando Cliente
                </>
              ) : (
                <span>Actualizar Cliente</span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </Form>
  );
}
