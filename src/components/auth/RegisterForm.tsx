"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/core/services/auth.service";
import { RegisterDto } from "@/core/models";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const registerSchema = z.object({
  name: z.string({ message: "El nombre debe tener al menos 8 caracteres" }),
  lastname: z.string({ message: "El apellido debe tener al menos 8 caracteres" }),
  dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  email: z.string().email({ message: "Debe ser un email válido" }),
});

export default function RegisterForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      dni: "",
      password: "",
      email: "",
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: async (data: RegisterDto) => {
      return await AuthService.register(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalida la consulta para refrescar la lista de usuarios
      toast({
        variant: "default",
        title: "Usuario creado exitosamente",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        title: "Error al crear un usuario",
        description: error.response?.data?.message || "Ocurrió un error al crear un usuario",
      });
    },
  });

  const onSubmit = (data: RegisterDto) => {
    registerUserMutation.mutate(data);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
            Registrar Usuario
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 rounded-lg shadow-md w-80 mx-auto">
            <h1 className="text-2xl font-bold text-center">Registrar usuario</h1>
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
            <FormField
              name="lastname"
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
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      placeholder="Ingrese su contraseña"
                      className="mt-1 block w-full p-2 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Guardar cambios</Button>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
