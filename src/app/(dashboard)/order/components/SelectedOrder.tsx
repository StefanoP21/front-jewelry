import {
  ChevronLeft,
  ChevronRight,
  CircleSlash,
  Coins,
  Copy,
  CreditCard,
  Landmark,
  MoreVertical,
  Smartphone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/core/models/order/model";
import { Button } from "@/components/ui/button";
import { formatFormalDate } from "@/core/utils/dateFormat";
import { IGV } from "@/core/constants";
import { useState } from "react";
import { DeleteOrderForm } from "./DeleteOrderForm";

interface SelectedOrderProps {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
}

export function SelectedOrder({ orders, selectedOrder, setSelectedOrder }: SelectedOrderProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNext = () => {
    if (orders.indexOf(selectedOrder!) < orders.length - 1) {
      setSelectedOrder(orders[orders.indexOf(selectedOrder!) + 1]);
    }
  };

  const handlePrevious = () => {
    if (orders.indexOf(selectedOrder!) > 0) {
      setSelectedOrder(orders[orders.indexOf(selectedOrder!) - 1]);
    }
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Venta con ID {selectedOrder?.id || "..."}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copiar el ID de la venta</span>
            </Button>
          </CardTitle>
          <CardDescription>Fecha: {formatFormalDate(selectedOrder?.date || "...")}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger disabled={!selectedOrder} asChild>
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
              <DeleteOrderForm onClose={() => setIsDeleteDialogOpen(false)} id={selectedOrder?.id} />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles de la Venta</div>
          <ul className="grid gap-3">
            {selectedOrder?.orderDetail.map((orderDetail) => (
              <li className="flex items-center justify-between" key={orderDetail.id}>
                <span className="text-muted-foreground">
                  {orderDetail.product.name} x <span>{orderDetail.quantity}</span>
                </span>
                <span>S/. {parseFloat(orderDetail.unitPrice.toString()).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>S/. {(parseFloat(selectedOrder?.total || "0") / (IGV + 1)).toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Impuestos</span>
              <span>
                S/.{" "}
                {(
                  parseFloat(selectedOrder?.total || "0") -
                  parseFloat(selectedOrder?.total || "0") / (IGV + 1)
                ).toFixed(2)}
              </span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>S/. {parseFloat(selectedOrder?.total || "0").toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información del Cliente</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Cliente</dt>
              <dd>{selectedOrder?.customer.name + " " + selectedOrder?.customer.lastName || "..."}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{selectedOrder?.customer.email || "..."}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Teléfono</dt>
              <dd>
                <a href="tel:"> {`+51 ${selectedOrder?.customer.phone}` || "..."}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información de Pago</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              {(() => {
                switch (selectedOrder?.paymentMethod) {
                  case "CASH":
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Coins className="h-4 w-4" />
                          Efectivo
                        </dt>
                        <dd>S/. {Math.ceil(parseFloat(selectedOrder?.total || "0") / 10) * 10}</dd>
                      </>
                    );
                  case "CARD":
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Tarjeta
                        </dt>
                        <dd>**** **** **** ****</dd>
                      </>
                    );
                  case "YAPE":
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Smartphone className="h-4 w-4" />
                          Plin
                        </dt>
                        <dd>{selectedOrder?.customer.phone}</dd>
                      </>
                    );
                  case "PLIN":
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Smartphone className="h-4 w-4" />
                          Plin
                        </dt>
                        <dd>{selectedOrder?.customer.phone}</dd>
                      </>
                    );
                  case "TRANSFER":
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <Landmark className="h-4 w-4" />
                          Transferencia
                        </dt>
                        <dd>**** **** **** ****</dd>
                      </>
                    );
                  default:
                    return (
                      <>
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CircleSlash className="h-4 w-4" />
                          No Disponible
                        </dt>
                        <dd>...</dd>
                      </>
                    );
                }
              })()}
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Actualizado <time dateTime={Date.now().toString()}>{formatFormalDate(Date.now())}</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={selectedOrder === orders[0]}
                onClick={handlePrevious}
                size="icon"
                variant="outline"
                className="h-6 w-6"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Compra Anterior</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={selectedOrder === orders[orders.length - 1]}
                onClick={handleNext}
                size="icon"
                variant="outline"
                className="h-6 w-6"
              >
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Siguiente Compra</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
