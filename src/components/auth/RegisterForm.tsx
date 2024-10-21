"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/core/services/auth.service";
import { RegisterDto } from "@/core/models";

const registerSchema = z.object({
  name: z.string({ message: "El nombre debe tener al menos 8 caracteres" }),
  lastname: z.string({ message: "El apellido debe tener al menos 8 caracteres" }),
  dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  email: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function RegisterForm() {
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

  const onSubmit = (data: RegisterDto) => {
    console.log(data);
    AuthService.register(data);
  };

  return (
    <div className="flex items-center justify-between min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 rounded-lg shadow-md w-80 mx-auto">
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
                  ></input>
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
                  ></input>
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
                  ></input>
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
                  ></input>
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
                  ></input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
