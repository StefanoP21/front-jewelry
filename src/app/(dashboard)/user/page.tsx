"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "@/components/auth/RegisterForm";
import AllUsersSkeleton from "./components/AllUsersSkeleton";
import AllUsers from "./components/AllUsers";
import { useUsers } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/core/store/auth.store";
import { redirect } from "next/navigation";

export default function UserPage() {
  const { user } = useAuthStore();

  if (user?.role === "USER") {
    redirect("/order");
  }

  const { isLoading, users } = useUsers();

  const [searchText, setSearchText] = useState<string>("");

  const filteredUsers = users.filter((user) => user.user.dni.includes(searchText));

  const filteredActiveUsers = users.filter((user) => user.user.dni.includes(searchText) && user.user.status);

  const filteredInactiveUsers = users.filter((user) => user.user.dni.includes(searchText) && !user.user.status);

  const [currentTab, setCurrentTab] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    setSearchText("");
  }, [currentTab]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <BreadcrumbPage>Usuarios</BreadcrumbPage>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setCurrentTab("all")}>
                Todos
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setCurrentTab("active")}>
                Activos
              </TabsTrigger>
              <TabsTrigger value="inactive" onClick={() => setCurrentTab("inactive")}>
                Inactivos
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <RegisterForm />
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Usuarios</CardTitle>
                <CardDescription>Administra a todos los usuarios y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? <AllUsersSkeleton /> : <AllUsers users={filteredUsers} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{users.length}</strong> usuarios
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Usuarios Activos</CardTitle>
                <CardDescription>Administra a todos los usuarios activos y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? <AllUsersSkeleton /> : <AllUsers users={filteredActiveUsers} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{filteredActiveUsers.length}</strong> usuarios
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Usuarios Inactivos</CardTitle>
                <CardDescription>Administra a todos los usuarios inactivos y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? <AllUsersSkeleton /> : <AllUsers users={filteredInactiveUsers} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{filteredInactiveUsers.length}</strong> usuarios
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
