"use client";

import Link from "next/link";
import { File, ListFilter, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProductForm } from "@/app/(dashboard)/product/components/CreateProductForm";
import { useProducts } from "@/hooks/useProducts";
import AllCategories from "./components/AllCategories";
import AllCategoriesSkeleton from "./components/AllCategoriesSkeleton";
import { useCategories } from "@/hooks/useCategories";

export default function OtherPage() {
  const { isLoading, categories } = useCategories();
  const { products } = useProducts();

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
                <Link href="#">Otros</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Todos las opciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="categories">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="categories">Categorías</TabsTrigger>
              <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
              <TabsTrigger value="materials">Materiales</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtro</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtro</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Activo</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Borrador</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archivado</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar</span>
              </Button>
              <CreateProductForm />
              {/*<Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
              </Button>*/}
            </div>
          </div>
          <TabsContent value="categories">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
                <CardDescription>Administra todos las categorías y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? <AllCategoriesSkeleton /> : <AllCategories categories={categories} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{categories.length}</strong> categorías
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="suppliers">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Proveedores</CardTitle>
                <CardDescription>Administra todos los proveedores y verifica su información.</CardDescription>
              </CardHeader>
              {/*isLoading ? <AllProductsSkeleton /> : <AllProducts products={products} />*/}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{products.length}</strong> proveedores
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="materials">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Materiales</CardTitle>
                <CardDescription>Administra todos los materiales y verifica su información.</CardDescription>
              </CardHeader>
              {/*isLoading ? <AllProductsSkeleton /> : <AllProducts products={products} />*/}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{products.length}</strong> materiales
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
