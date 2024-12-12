import { CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllSuppliersSkeleton() {
  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>RUC</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          <Table>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-[200px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[120px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[180px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[40px] h-[20px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[70px] h-[20px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </>
  );
}
