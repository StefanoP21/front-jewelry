import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Copy, MoreVertical } from "lucide-react";
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
import { formatFormalDate } from "@/core/utils/dateFormat";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Refund } from "@/core/models/refunds/model";
import { DeleteRefundForm } from "./DeleteRefundForm";

interface SelectedRefundProps {
  refunds: Refund[];
  selectedRefund: Refund | null;
  setSelectedRefund: (refund: Refund | null) => void;
}

export function SelectedRefund({ refunds, selectedRefund, setSelectedRefund }: SelectedRefundProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNext = () => {
    if (refunds.indexOf(selectedRefund!) < refunds.length - 1) {
      setSelectedRefund(refunds[refunds.indexOf(selectedRefund!) + 1]);
    }
  };

  const handlePrevious = () => {
    if (refunds.indexOf(selectedRefund!) > 0) {
      setSelectedRefund(refunds[refunds.indexOf(selectedRefund!) - 1]);
    }
  };

  const TotalRefund = (refund: Refund | null) => {
    if (!refund) {
      return 0;
    }

    return refund.refundDetail.reduce((total, element) => {
      return total + parseFloat(element.purchaseDetail.unitPrice) * element.quantity;
    }, 0);
  };

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Devolución con ID {selectedRefund?.id || "..."}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copiar el ID de la Devolución</span>
            </Button>
          </CardTitle>
          <CardDescription>Fecha: {formatFormalDate(selectedRefund?.date) || "..."}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger disabled={!selectedRefund} asChild>
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
              <DeleteRefundForm onClose={() => setIsDeleteDialogOpen(false)} id={selectedRefund?.id} />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles de la Devolución</div>
          <ul className="grid gap-3">
            {selectedRefund?.refundDetail.map((detail) => (
              <li className="flex items-center justify-between" key={detail.id}>
                <span className="text-muted-foreground">
                  {detail.purchaseDetail.product.name} x <span>{detail.quantity}</span>
                </span>
                <span>S/.{parseFloat(detail.purchaseDetail.unitPrice).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Comentario</div>
          <p>{selectedRefund?.comment}</p>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Monto Total</span>
              <span>S/.{TotalRefund(selectedRefund!).toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información del Proveedor</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Proveedor</dt>
              <dd>{selectedRefund?.purchase.supplier.companyName || `...`}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Contacto</dt>
              <dd>{selectedRefund?.purchase.supplier.nameContact || `...`}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{selectedRefund?.purchase.supplier.email || `...`}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Teléfono</dt>
              <dd>
                <a href="tel:">
                  {selectedRefund?.purchase.supplier.phone ? `+51 ${selectedRefund?.purchase.supplier.phone}` : `...`}
                </a>
              </dd>
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
                disabled={selectedRefund === refunds[0]}
                onClick={handlePrevious}
                size="icon"
                variant="outline"
                className="h-6 w-6"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Devolución Anterior</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={selectedRefund === refunds[refunds.length - 1]}
                onClick={handleNext}
                size="icon"
                variant="outline"
                className="h-6 w-6"
              >
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Siguiente Devolución</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}
