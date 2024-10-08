"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/core/services/auth.service";
import { RegisterDto } from "@/core/models";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(8, { message: "El nombre debe tener al menos 8 caracteres" }),
  lastname: z.string().min(8, { message: "El apellido debe tener al menos 8 caracteres" }),
  dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  role: z.enum(["USER", "ADMIN"], { required_error: "El rol es requerido" }),
});

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastname: "",
      dni: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = (data: RegisterDto) => {
    console.log(data);
    AuthService.register(data);
  };

  return (
    <div className="flex items-center justify-between min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md w-80 mx-auto"
        >
          <h1 className="text-2xl font-bold text-center">Registrar usuario</h1>
          <FormField
            name="dni"
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
            name="dni"
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
          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <div className="flex space-x-4">
                    <div>
                      <label>
                        <input type="radio" value="USER" checked={field.value === "USER"} onChange={field.onChange} />
                        <span className="ms-2">User</span>
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" value="ADMIN" checked={field.value === "ADMIN"} onChange={field.onChange} />
                        <span className="ms-2">Admin</span>
                      </label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-right">
            <Link className="text-blue-500 underline" href={"/login"}>
              Iniciar sesión
            </Link>
          </p>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
