"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/app/store/authStore";

interface LoginFormInputs {
  dni: string;
  password: string;
}

const loginSchema = z.object({
  dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

interface LoginResponse {
  user: {
    id: string;
    dni: string;
    username: string;
  }
}

const login = async(data: LoginFormInputs): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error("Error en la autenticación");
  }

  return response.json();
}

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: ""
    }
  });

  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      console.log(data)
    },
    onError: (error: Error) => {
      console.error("Error en el login: ", error.message)
    }
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-lg shadow-md w-80"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <FormField
            name="dni"
            control={form.control}
            render={({field}) => (
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
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          {mutation.isPending && <p className="text-center text-blue-500">Iniciando sesión</p>}
          {mutation.isError && <p className="text-center text-red-500">{mutation.error?.message}</p>}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Iniciar sesión
          </Button>
        </form>
      </Form>
    </div>
  );
}
