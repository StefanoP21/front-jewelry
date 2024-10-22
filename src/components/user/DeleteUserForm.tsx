"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { UserService } from "@/core/services/user.service";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const userSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

export function DeleteUserForm(props: { id: number; dni: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: String(props.id),
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      // Realiza la eliminación del usuario llamando al servicio
      return await UserService.deleteUserById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        variant: "default",
        title: "Usuario eliminado exitosamente",
      });
      setIsOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        title: "Error al eliminar un usuario",
        description: error.response?.data?.message || "Ocurrió un error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    deleteUserMutation.mutate(Number(values.id));
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          className="w-full d-block"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          Eliminar
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar usuario con DNI {props.dni}?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter>
              <Button type="submit" disabled={deleteUserMutation.isPending}>
                {deleteUserMutation.isPending ? "Eliminando..." : "Guardar cambios"}
              </Button>
              <Button type="button" variant="secondary" onClick={handleClose} disabled={deleteUserMutation.isPending}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
