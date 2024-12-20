import { CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllProductsSkeleton() {
  return (
    <>
      <CardContent className="w-full mx-auto max-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3 text-center">ID</TableHead>
              <TableHead className="w-1/3 text-center">Nombre</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          <Table>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-[20px] w-1/3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-1/3" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-[20px] w-1/3" />
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
