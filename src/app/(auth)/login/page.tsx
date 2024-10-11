"use client";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/core/store/auth.store";
import { AxiosError } from "axios";

const loginSchema = z.object({
  dni: z.string().min(8, { message: "El DNI debe tener al menos 8 caracteres" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function LoginPage() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      await loginUser(values.dni, values.password);
      redirect("/order");
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al intentar iniciar sesión",
      });
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-login bg-cover bg-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 mx-auto bg-background px-7 py-10 rounded-xl shadow-l"
        >
          <h1 className="text-2xl font-bold text-center text-primary">Joyería y Relojería &quot;Jenny&quot;</h1>
          <h2 className="text-xl font-semibold">Iniciar sesión</h2>
          <hr />
          <FormField
            name="dni"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="dni">DNI</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="dni"
                    type="text"
                    placeholder="Ingrese su DNI"
                    autoComplete="username"
                    disabled={isLoading}
                  ></Input>
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
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    autoComplete="current-password"
                    disabled={isLoading}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button
            type="submit"
            className="w-full bg-primary text-white"
            aria-label="Iniciar sesión"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Validando credenciales
              </>
            ) : (
              <span>Iniciar sesión</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
