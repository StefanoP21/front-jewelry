import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Purchase } from "@/core/models/purchase/model";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/core/utils/dateFormat";

interface AllPurchasesProps {
  purchases: Purchase[];
  selectedPurchase: Purchase | null;
  setSelectedPurchase: (purchase: Purchase | null) => void;
}

export default function AllPurchases({ setSelectedPurchase, selectedPurchase, purchases }: AllPurchasesProps) {
  const handleRowClick = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
  };

  return (
    <>
      <CardContent>
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
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow
                className={selectedPurchase?.id === purchase.id ? "bg-accent" : ""}
                key={purchase.id}
                onClick={() => handleRowClick(purchase)}
              >
                <TableCell>
                  <div className="font-medium">{purchase.supplier.companyName}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">{purchase.supplier.nameContact}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{purchase.purchaseDetail.length}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {purchase.bill}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(purchase.date)}</TableCell>
                <TableCell className="text-right">{`${parseFloat(purchase.total).toFixed(2)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
