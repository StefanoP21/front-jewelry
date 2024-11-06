import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectedRefundSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Compra con ID <Skeleton className="h-5 w-5" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles de la Devolución</div>
          <ul className="grid gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <li className="flex items-center justify-between" key={index}>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-16" />
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Comentario</div>
            <dl className="grid gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-20" />
            </dl>
          </div>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            {["Subtotal", "Impuestos", "Total"].map((label) => (
              <li className="flex items-center justify-between" key={label}>
                <Skeleton className="text-muted-foreground h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Información del Proveedor</div>
            <dl className="grid gap-3">
              {["Proveedor", "Contacto", "Email", "Teléfono"].map((label) => (
                <div className="flex items-center justify-between" key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd>
                    <Skeleton className="h-4 w-32" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <Skeleton className="h-4 w-24" />
        <div className="ml-auto mr-0 w-auto">
          <Skeleton className="h-6 w-12" />
        </div>
      </CardFooter>
    </Card>
  );
}
