import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentMethodLabels } from "@/core/constants";
import { Order } from "@/core/models/order/model";
import { formatDate } from "@/core/utils/dateFormat";

interface AllOrdersProps {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
}

export default function AllOrders({ orders, selectedOrder, setSelectedOrder }: AllOrdersProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead className="hidden sm:table-cell">Productos</TableHead>
            <TableHead className="hidden sm:table-cell">Tipo de Pago</TableHead>
            <TableHead className="hidden md:table-cell">Fecha</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[calc(100vh-510px)] w-full">
        <Table>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                className={selectedOrder?.id === order.id ? "bg-accent" : ""}
                key={order.id}
                onClick={() => setSelectedOrder(order)}
              >
                <TableCell>
                  <div className="font-medium">{order.customer.name + " " + order.customer.lastName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">{order.customer.dni}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{order.orderDetail.length}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {PaymentMethodLabels[order.paymentMethod]}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                <TableCell className="text-right">S/.{parseFloat(order.total).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar />
      </ScrollArea>
    </>
  );
}
