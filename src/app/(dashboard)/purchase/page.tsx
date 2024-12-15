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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AllPurchases from "./components/AllPurchases";
import { usePurchases } from "@/hooks/usePurchases";
import { useEffect, useState } from "react";
import { Purchase } from "@/core/models/purchase/model";
import { SelectedPurchase } from "./components/SelectedPurchase";
import { AllPurchasesSkeleton } from "./components/AllPurchasesSkeleton";
import { SelectedPurchaseSkeleton } from "./components/SelectedPurchaseSkeleton";
import { CreatePurchaseForm } from "./components/CreatePurchaseForm";
import useAmount from "@/hooks/useAmount";

export default function PurchasePage() {
  const { isLoading, purchases } = usePurchases();

  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(purchases[0]);
  const [searchText, setSearchText] = useState<string>("");

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.bill.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    setSelectedPurchase(purchases[0]);
  }, [purchases]);

  const {
    totalThisWeek,
    totalPreviousWeek,
    totalThisMonth,
    totalPreviousMonth,
    percentageChangeWeek,
    percentageChangeMonth,
  } = useAmount(purchases);

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
                <BreadcrumbPage>Compras</BreadcrumbPage>
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
                <Progress
                  value={totalPreviousWeek === 0 ? 0 : Math.min(percentageChangeWeek, 100)}
                  aria-label="Compras esta semana"
                />
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
                <Progress
                  value={totalPreviousMonth === 0 ? 0 : Math.min(percentageChangeMonth, 100)}
                  aria-label="Compras este mes"
                />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
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
                      purchases={filteredPurchases}
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
              purchases={filteredPurchases}
            />
          )}
        </div>
      </main>
    </div>
  );
}
