import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react"; // Asegúrate de que LoaderCircle esté disponible si lo estás usando
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/core/services/auth.service";
import { useAuthStore } from "@/core/store/auth.store";
import { AxiosError } from "axios";
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Debes confirmar la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function ChangePasswordForm({ closeDialog }: { closeDialog: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { user } = useAuthStore();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await AuthService.updatePassword({
        dni: user!.dni,
        password: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast({
        variant: "default",
        title: "Cambiada correctamente",
        description: "Su contraseña ha sido cambiada correctamente",
      });
      setIsLoading(false);

      form.reset();
      closeDialog();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al cambiar contraseña",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al intentar cambiar contraseña",
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogDescription>Cambia la contraseña de la cuenta de usuario actual.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Contraseña actual */}
          <div className="grid gap-4 py-3">
            <div className="space-y-1">
              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="currentPassword">Contraseña actual</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="currentPassword"
                        type="password"
                        placeholder="Ingrese su contraseña actual"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1">
              {/* Nueva contraseña */}
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="newPassword"
                        type="password"
                        placeholder="Ingrese su nueva contraseña"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1">
              {/* Confirmación de la nueva contraseña */}
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirmar nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        placeholder="Repetir nueva contraseña"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              {/* Botón de enviar */}
              <Button
                type="submit"
                className="w-full bg-primary text-white"
                aria-label="Guardar nueva contraseña"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Guardando
                  </>
                ) : (
                  <span>Guardar</span>
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </>
  );
}
