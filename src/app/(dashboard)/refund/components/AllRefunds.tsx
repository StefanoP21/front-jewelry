import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Refund } from "@/core/models/refunds/model";
import { formatDate } from "@/core/utils/dateFormat";

interface AllRefundsProps {
  setSelectedRefund: (refund: Refund | null) => void;
  selectedRefund: Refund | null;
  refunds: Refund[];
}

export function AllRefunds({ setSelectedRefund, selectedRefund, refunds }: AllRefundsProps) {
  const TotalRefund = (refund: Refund) => {
    return refund.refundDetail.reduce((total, element) => {
      return total + parseFloat(element.purchaseDetail.unitPrice) * element.quantity;
    }, 0);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proveedor</TableHead>
            <TableHead className="hidden sm:table-cell">Productos</TableHead>
            <TableHead className="hidden sm:table-cell">ID de Recibo</TableHead>
            <TableHead className="hidden md:table-cell">Fecha</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[calc(100vh-510px)] w-full">
        <Table>
          <TableBody>
            {refunds.map((refund) => (
              <TableRow
                className={selectedRefund?.id === refund.id ? "bg-accent" : ""}
                key={refund.id}
                onClick={() => setSelectedRefund(refund)}
              >
                <TableCell>
                  <div className="font-medium">{refund.purchase.supplier.companyName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {refund.purchase.supplier.nameContact}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{refund.refundDetail.length}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {refund.purchase.bill}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(refund.date)}</TableCell>
                <TableCell className="text-right">{`S/. ${TotalRefund(refund).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar />
      </ScrollArea>
    </>
  );
}
