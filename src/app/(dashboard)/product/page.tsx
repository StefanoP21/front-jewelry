"use client";

import Link from "next/link";
import { File, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProductForm } from "@/app/(dashboard)/product/components/CreateProductForm";
import { useProducts } from "@/hooks/useProducts";
import AllProducts from "./components/AllProducts";
import AllProductsSkeleton from "./components/AllProductsSkeleton";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { isLoading, products } = useProducts();

  const [searchText, setSearchText] = useState<string>("");

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));

  const filteredActiveProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchText.toLowerCase()) && product.status,
  );

  const filteredInactiveProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchText.toLowerCase()) && !product.status,
  );

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
                <BreadcrumbPage>Productos</BreadcrumbPage>
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
              <Button size="sm" variant="outline" className="h-7 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Exportar</span>
              </Button>
              <CreateProductForm />
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Productos</CardTitle>
                <CardDescription>Administra todos los productos y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? <AllProductsSkeleton /> : <AllProducts products={filteredProducts} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{products.length}</strong> productos
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Productos Activos</CardTitle>
                <CardDescription>Administra todos los productos activos y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? (
                <AllProductsSkeleton />
              ) : (
                <AllProducts products={filteredActiveProducts} filtered="active" />
              )}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{filteredActiveProducts.length}</strong> productos
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Productos Inactivos</CardTitle>
                <CardDescription>Administra todos los productos inactivos y verifica su información.</CardDescription>
              </CardHeader>
              {isLoading ? (
                <AllProductsSkeleton />
              ) : (
                <AllProducts products={filteredInactiveProducts} filtered="inactive" />
              )}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>1-10</strong> de <strong>{filteredInactiveProducts.length}</strong> productos
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
