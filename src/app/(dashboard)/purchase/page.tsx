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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllPurchases from "./components/AllPurchases";
import { usePurchases } from "@/hooks/usePurchases";
import { useEffect, useState } from "react";
import { Purchase } from "@/core/models/purchase/model";
import { SelectedPurchase } from "./components/SelectedPurchase";
import { AllPurchasesSkeleton } from "./components/AllPurchasesSkeleton";
import { SelectedPurchaseSkeleton } from "./components/SelectedPurchaseSkeleton";
import { CreatePurchaseForm } from "./components/CreatePurchaseForm";

export default function PurchasePage() {
  const { isLoading, purchases } = usePurchases();

  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(purchases[0]);

  useEffect(() => {
    if (purchases.length >= 0) {
      setSelectedPurchase(purchases[0]);
    }
  }, [purchases]);

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
                <Link href="#">Compras</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Compras Recientes</BreadcrumbPage>
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
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Tus Compras</CardTitle>
                <CardDescription className="text-balance max-w-lg leading-relaxed">
                  Introduciendo nuestro dashboard dinámico para el manejo y análisis de seguimiento de compras.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CreatePurchaseForm />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Esta Semana</CardDescription>
                <CardTitle className="text-4xl">$0</CardTitle>
              </CardHeader>
              <CardContent>
                {/*<div className="text-xs text-muted-foreground">+25% from last week</div>*/}
                <div className="text-xs text-muted-foreground">No hay información disponible</div>
              </CardContent>
              <CardFooter>
                <Progress value={0} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Este Mes</CardDescription>
                <CardTitle className="text-4xl">$0</CardTitle>
              </CardHeader>
              <CardContent>
                {/*<div className="text-xs text-muted-foreground">+10% from last month</div>*/}
                <div className="text-xs text-muted-foreground">No hay información disponible</div>
              </CardContent>
              <CardFooter>
                <Progress value={0} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
                <TabsTrigger value="year">Año</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filtro</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>Completado</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Cancelado</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Exportar</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Compras</CardTitle>
                  <CardDescription>Compras recientes de tu tienda.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <AllPurchasesSkeleton />
                  ) : (
                    <AllPurchases
                      setSelectedPurchase={setSelectedPurchase}
                      selectedPurchase={selectedPurchase}
                      purchases={purchases}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          {isLoading ? (
            <SelectedPurchaseSkeleton />
          ) : (
            <SelectedPurchase
              setSelectedPurchase={setSelectedPurchase}
              selectedPurchase={selectedPurchase}
              purchases={purchases}
            />
          )}
        </div>
      </main>
    </div>
  );
}
