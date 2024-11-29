import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllSuppliersSkeleton() {
  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Contacto</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Teléfono</TableHead>
              <TableHead className="hidden md:table-cell">Empresa</TableHead>
              <TableHead className="hidden md:table-cell">RUC</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="w-[200px] h-[20px]" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="w-[120px] h-[20px]" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="w-[180px] h-[20px]" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="w-[40px] h-[20px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[70px] h-[20px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
