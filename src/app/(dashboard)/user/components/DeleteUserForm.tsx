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
import { LoaderCircle } from "lucide-react";

const userSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

export function DeleteUserForm(props: { id: number; status: boolean }) {
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
      return await UserService.updateStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        variant: "default",
        title: "Estado actualizado exitosamente",
      });
      setIsOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        title: "Error al actualizar el estado",
        description: error.response?.data?.message || "Ocurrió un error",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    deleteUserMutation.mutate(Number(values.id));
  };

  const handleOpen = () => setIsOpen(true);

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
          {props.status ? "Inhabilitar" : "Habilitar"}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {props.status ? `Inhabilitar usuario con ID ${props.id}?` : `Habilitar usuario con ID ${props.id}?`}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-2">
              <span>Esta acción afectará al usuario seleccionado.</span>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={deleteUserMutation.isPending}>
                {deleteUserMutation.isPending ? (
                  <>
                    <LoaderCircle className="h-5 w-5 mr-3 animate-spin" />{" "}
                    {props.status ? "Inhabilitando usuario" : "Habilitando usuario"}
                  </>
                ) : (
                  <span>{props.status ? "Inhabilitar usuario" : "Habilitar usuario"}</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
