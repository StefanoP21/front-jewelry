"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { UserService } from "@/core/services/user.service";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const userSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

export function DeleteUserForm(props: { id: number; dni: string }) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: String(props.id),
    },
  });

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    try {
      UserService.deleteUserById(Number(values.id));
      toast({
        variant: "default",
        title: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar un usuario",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al eliminar un usuario",
      });
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full d-block" onClick={(e) => e.stopPropagation()}>
          Delete
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User with DNI {props.dni}?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
