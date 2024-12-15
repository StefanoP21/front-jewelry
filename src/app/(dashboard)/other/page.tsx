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
import AllCategories from "./components/category/AllCategories";
import AllCategoriesSkeleton from "./components/category/AllCategoriesSkeleton";
import { useCategories } from "@/hooks/useCategories";
import { CreateCategoryForm } from "./components/category/CreateCategoryForm";
import AllMaterialsSkeleton from "./components/material/AllMaterialsSkeleton";
import AllMaterials from "./components/material/AllMaterials";
import { useMaterials } from "@/hooks/useMaterials";
import { useEffect, useState } from "react";
import { CreateMaterialForm } from "./components/material/CreateMaterialForm";
import AllSuppliers from "./components/supplier/AllSuppliers";
import AllSuppliersSkeleton from "./components/supplier/AllSuppliersSkeleton";
import { useSuppliers } from "@/hooks/useSuppliers";
import { CreateSupplierForm } from "./components/supplier/CreateSupplierForm";

export default function OtherPage() {
  const { isLoading, categories } = useCategories();
  const { materials } = useMaterials();
  const { suppliers } = useSuppliers();

  const [currentTab, setCurrentTab] = useState<"categories" | "suppliers" | "materials">("categories");
  const [searchText, setSearchText] = useState<string>("");

  const filteredCategories = categories.filter((categorie) =>
    categorie.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.companyName.toLowerCase().includes(searchText.toLowerCase()),
  );

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
                <BreadcrumbPage>Otros</BreadcrumbPage>
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
              <TabsTrigger value="categories" onClick={() => setCurrentTab("categories")}>
                Categorías
              </TabsTrigger>
              <TabsTrigger value="suppliers" onClick={() => setCurrentTab("suppliers")}>
                Proveedores
              </TabsTrigger>
              <TabsTrigger value="materials" onClick={() => setCurrentTab("materials")}>
                Materiales
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              {currentTab === "categories" && <CreateCategoryForm />}
              {currentTab === "suppliers" && <CreateSupplierForm />}
              {currentTab === "materials" && <CreateMaterialForm />}
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
              {isLoading ? <AllCategoriesSkeleton /> : <AllCategories categories={filteredCategories} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{categories.length}</strong> categorías
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
              {isLoading ? <AllSuppliersSkeleton /> : <AllSuppliers suppliers={filteredSuppliers} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{suppliers.length}</strong> proveedores
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
              {isLoading ? <AllMaterialsSkeleton /> : <AllMaterials materials={filteredMaterials} />}
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Mostrando <strong>{materials.length}</strong> materiales
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
