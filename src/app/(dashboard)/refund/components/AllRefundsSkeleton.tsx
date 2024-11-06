import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function AllRefundsSkeleton() {
  return (
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
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-[120px] h-[40px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="[60px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[88px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[60px] h-[40px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
