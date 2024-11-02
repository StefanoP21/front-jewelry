import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Purchase } from "@/core/models/purchase/model";
import { formatFormalDate } from "@/core/utils/dateFormat";
import { DeletePurchaseForm } from "./DeletePurchaseForm";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

interface SelectedPurchaseProps {
  purchases: Purchase[];
  selectedPurchase: Purchase | null;
  setSelectedPurchase: (purchase: Purchase | null) => void;
}

export function SelectedPurchase({ setSelectedPurchase, selectedPurchase, purchases }: SelectedPurchaseProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNext = () => {
    if (purchases.indexOf(selectedPurchase!) < purchases.length - 1) {
      setSelectedPurchase(purchases[purchases.indexOf(selectedPurchase!) + 1]);
    }
  };

  const handlePrevious = () => {
    if (purchases.indexOf(selectedPurchase!) > 0) {
      setSelectedPurchase(purchases[purchases.indexOf(selectedPurchase!) - 1]);
    }
  };

  return (
    <>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {`Compra con ID ${selectedPurchase?.id}`}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copiar el ID de la compra</span>
              </Button>
            </CardTitle>
            {/* Arreglar */}
            <CardDescription>{`Fecha: ${formatFormalDate(selectedPurchase?.date || "")}`}</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {/*
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
                </Button>
                */}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">Más</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Exportar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <DeletePurchaseForm onClose={() => setIsDeleteDialogOpen(false)} id={selectedPurchase?.id} />
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Detalles de la Compra</div>
            <ul className="grid gap-3">
              {selectedPurchase?.purchaseDetail.map((detail) => (
                <li className="flex items-center justify-between" key={detail.id}>
                  <span className="text-muted-foreground">
                    {detail.product.name} x <span>{detail.quantity}</span>
                  </span>
                  <span>${parseFloat(detail.unitPrice.toString()).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${(parseFloat(selectedPurchase?.total || "0") * 0.82).toFixed(2)}</span>
              </li>
              {/*
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </li>
                  */}
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Impuestos</span>
                <span>${(parseFloat(selectedPurchase?.total || "0") * 0.18).toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>${parseFloat(selectedPurchase?.total || "0").toFixed(2)}</span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Información del Proveedor</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Proveedor</dt>
                <dd>{selectedPurchase?.supplier.companyName}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Contacto</dt>
                <dd>{selectedPurchase?.supplier.nameContact}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:">{selectedPurchase?.supplier.email}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Teléfono</dt>
                <dd>
                  <a href="tel:">+51 {selectedPurchase?.supplier.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Información de Pago</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Visa
                </dt>
                <dd>**** **** **** 4532</dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            {/*fecha actual*/}
            Actualizado <time dateTime={Date.now().toString()}>{formatFormalDate(Date.now())}</time>
          </div>
          <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button onClick={handlePrevious} size="icon" variant="outline" className="h-6 w-6">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only">Compra Anterior</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button onClick={handleNext} size="icon" variant="outline" className="h-6 w-6">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="sr-only">Siguiente Compra</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </>
  );
}
