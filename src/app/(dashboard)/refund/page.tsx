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
// import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRefunds } from "@/hooks/useRefunds";
import { useEffect, useState } from "react";
import { Refund } from "@/core/models/refunds/model";
import { AllRefunds } from "./components/AllRefunds";
import { AllPurchasesSkeleton } from "../purchase/components/AllPurchasesSkeleton";
import { SelectedRefund } from "./components/SelectedRefund";
import { SelectedRefundSkeleton } from "./components/SelectedRefundSkeleton";
import { CreateRefundForm } from "./components/CreateRefundForm";
// import useAmount from "@/hooks/useAmount";

export default function RefundPage() {
  const { isLoading, refunds } = useRefunds();

  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(refunds[0]);
  const [searchText, setSearchText] = useState<string>("");

  const filteredRefunds = refunds.filter((refund) =>
    refund.purchase.bill.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    setSelectedRefund(refunds[0]);
  }, [refunds]);

  /*
  const {
    totalThisWeek,
    totalPreviousWeek,
    totalThisMonth,
    totalPreviousMonth,
    percentageChangeWeek,
    percentageChangeMonth,
  } = useAmount(refunds);

  console.log({
    totalThisWeek,
    totalPreviousWeek,
    totalThisMonth,
    totalPreviousMonth,
    percentageChangeWeek,
    percentageChangeMonth,
  })
  */

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
                <Link href="#">Devoluciones</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Devoluciones Recientes</BreadcrumbPage>
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
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-full" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Tus Devoluciones</CardTitle>
                <CardDescription className="text-balance max-w-lg leading-relaxed">
                  Introduciendo nuestro dashboard dinámico para el manejo y análisis de seguimiento de devoluciones.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CreateRefundForm />
              </CardFooter>
            </Card>
            {/*
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Esta Semana</CardDescription>
                <CardTitle className="text-4xl">S/. {totalThisWeek.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {percentageChangeWeek >= 0
                    ? `+${percentageChangeWeek.toFixed(2)}% desde la última Semana`
                    : `${percentageChangeWeek.toFixed(2)}% desde la última Semana`}
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={
                  totalPreviousWeek === 0
                    ? 0
                    : Math.min(percentageChangeWeek, 100)
                } aria-label="Reembolsos esta semana" />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Este Mes</CardDescription>
                <CardTitle className="text-4xl">S/. {totalThisMonth.toFixed(2)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {percentageChangeMonth >= 0
                    ? `+${percentageChangeMonth.toFixed(2)}% desde el último Mes`
                    : `${percentageChangeMonth.toFixed(2)}% desde el último Mes`}
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={
                  totalPreviousMonth === 0
                    ? 0
                    : Math.min(percentageChangeMonth, 100)
                } aria-label="Reembolsos este mes" />
              </CardFooter>
            </Card>
            */}
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
                  <CardTitle>Devoluciones</CardTitle>
                  <CardDescription>Devoluciones recientes a tu proveedor.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <AllPurchasesSkeleton />
                  ) : (
                    <AllRefunds
                      setSelectedRefund={setSelectedRefund}
                      selectedRefund={selectedRefund}
                      refunds={filteredRefunds}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          {isLoading ? (
            <SelectedRefundSkeleton />
          ) : (
            <SelectedRefund
              setSelectedRefund={setSelectedRefund}
              selectedRefund={selectedRefund}
              refunds={filteredRefunds}
            />
          )}
        </div>
      </main>
    </div>
  );
}
