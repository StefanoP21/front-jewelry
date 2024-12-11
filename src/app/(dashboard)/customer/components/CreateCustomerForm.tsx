"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle, PlusCircle, Search, X } from "lucide-react";
import { useCustomers } from "@/hooks/useCustomers";
import { CustomerService } from "@/core/services/customer.service";
import { capitalizeFirstLetter } from "@/core/utils/CapitalizeStrings";

const customerSchema = z.object({
  name: z.string({ message: "El nombre es obligatorio" }),
  lastName: z.string({ message: "El apellido es obligatorio" }),
  dni: z.string().min(8, { message: "El DNI debe tener 8 caracteres" }),
  phone: z.string().min(9, { message: "El numero de teléfono debe tener al menos 9 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
});

export default function CreateCustomerForm() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDNI, setIsLoadingDNI] = useState(false);
  const { refetch } = useCustomers();

  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      dni: "",
      phone: "",
      email: "",
    },
  });

  const [DNIfetched, setDNIfetched] = useState(false);

  const handleDniSearch = async () => {
    const dni = form.getValues("dni").toString().trim();
    if (dni.length === 8) {
      try {
        setIsLoadingDNI(true);
        const response = await CustomerService.getCustomerByDNI({ dni });

        if (!response.success) {
          form.setError("dni", {
            type: "manual",
            message: "No se encontró información para este DNI.",
          });
          setIsLoadingDNI(false);
          return;
        }

        setDNIfetched(true);
        form.setValue("name", capitalizeFirstLetter(response.data.nombres));
        form.setValue(
          "lastName",
          capitalizeFirstLetter(response.data.apellido_paterno + " " + response.data.apellido_materno),
        );
        setIsLoadingDNI(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al obtener los datos del DNI",
          description:
            (error as AxiosError<{ message: string }>)?.response?.data?.message ||
            "No se pudo obtener la información del DNI",
        });
        setIsLoadingDNI(false);
      }
    } else {
      form.setError("dni", { type: "manual", message: "El DNI debe tener 8 caracteres" });
    }
  };

  const onSubmit = async (values: z.infer<typeof customerSchema>) => {
    setIsLoading(true);
    try {
      await CustomerService.createCustomer(values);

      toast({
        variant: "default",
        title: "Cliente registrado exitosamente",
      });

      form.reset();
      setDNIfetched(false);
      refetch();
      setIsOpen(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al registrar un cliente",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrio un error al registrar un cliente",
      });
      throw error;
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);

  const handleClearDni = () => {
    form.setValue("dni", "");
    form.setValue("name", "");
    form.setValue("lastName", "");
    setDNIfetched(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span
            className="sr-only sm:not-sr-only sm:whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
          >
            Registrar Cliente
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar cliente</DialogTitle>
          <DialogDescription>Cree un nuevo cliente en la aplicación.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-3">
              <div className="flex items-center gap-2">
                <FormField
                  name="dni"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          maxLength={8}
                          disabled={DNIfetched}
                          pattern="[0-9]{8}"
                          placeholder="Ingrese su DNI"
                          className="mt-1 block w-full p-2 border rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {DNIfetched ? (
                  <Button
                    type="button"
                    className="rounded-full p-2 w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700"
                    onClick={handleClearDni}
                    disabled={isLoadingDNI}
                  >
                    <X className="h-5 w-5 text-white" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="rounded-full p-2 w-12 h-12 flex items-center justify-center"
                    onClick={handleDniSearch}
                    disabled={isLoadingDNI || DNIfetched}
                  >
                    {isLoadingDNI ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                  </Button>
                )}
              </div>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        readOnly
                        type="text"
                        placeholder="Ingrese su nombre"
                        className="mt-1 block w-full p-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <input
                        readOnly
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
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="tel"
                          maxLength={9}
                          pattern="[0-9]{9}"
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
                      <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Registrando Cliente
                    </>
                  ) : (
                    <span>Registrar Cliente</span>
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
