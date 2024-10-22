import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllProductsSkeleton() {
  return (
    <>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Imagen</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Descripción</TableHead>
              <TableHead className="hidden md:table-cell">Categoría</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="w-[64px] h-[64px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[100px] h-[20px]" />
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
                <TableCell>
                  <Skeleton className="w-[30px] h-[20px]" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="w-[20px] h-[20px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-[36px] h-[36px]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
