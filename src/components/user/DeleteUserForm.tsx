"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

const userSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

export function DeleteUserForm() {
  const form = useForm({
    resolver: zodResolver(userSchema), // Resolver de zod
    defaultValues: {
      id: "",
    },
  });

  /*const onSubmit = (data: any) => {
    console.log(data);
  };*/

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="w-full d-block" onClick={(e) => e.stopPropagation()}>
          Delete
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form /*onSubmit={form.handleSubmit(onSubmit)}*/>
            <DialogFooter>
              <Button type="submit">Delete</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
