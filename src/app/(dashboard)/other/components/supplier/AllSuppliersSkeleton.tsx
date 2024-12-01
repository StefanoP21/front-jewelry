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
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nombre del Contacto</TableHead>
              <TableHead className="text-center">Correo Electrónico</TableHead>
              <TableHead className="text-center">Teléfono</TableHead>
              <TableHead className="text-center">Nombre de la Empresa</TableHead>
              <TableHead className="text-center">RUC</TableHead>
              <TableHead className="text-center">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Skeleton className="w-[64px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[150px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[180px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[120px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[180px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[120px] h-[20px]" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="w-[150px] h-[20px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
