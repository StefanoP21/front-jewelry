import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function AllOrdersSkeleton() {
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
            {Array.from({ length: 7 }).map((_, index) => (
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
        <ScrollBar />
      </ScrollArea>
    </>
  );
}
