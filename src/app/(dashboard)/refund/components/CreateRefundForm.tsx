import { Button } from "@/components/ui/button";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, Edit, LoaderCircle, Minus, Plus, Trash } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePurchases } from "@/hooks/usePurchases";
import { Purchase, PurchaseDetail } from "@/core/models/purchase/model";
import Image from "next/image";
import { CreateRefundDetail } from "@/core/models/refunds/model";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/core/store/auth.store";
import { RefundService } from "@/core/services/refund.service";
import { toast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { AxiosError } from "axios";
import { useRefunds } from "@/hooks/useRefunds";
import { Input } from "@/components/ui/input";

const refundSchema = z.object({
  purchaseId: z.string().min(1, { message: "La compra es requerida" }),
  comment: z.string().min(1, { message: "El comentario es requerido" }),
  refundDetail: z.array(
    z.object({
      purchaseDetailId: z.number().min(1, { message: "El producto es requerido" }),
      quantity: z.number().min(1, { message: "La cantidad es requerida" }),
    }),
  ),
});

export function CreateRefundForm() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { purchases, refetch: refetchPurchases } = usePurchases();
  const { refetch: refetchProducts } = useProducts();
  const { refetch } = useRefunds();
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase>();
  const [selectedPurchaseDetail, setSelectedPurchaseDetail] = useState<CreateRefundDetail>();
  const [refundDetailList, setRefundDetailList] = useState<CreateRefundDetail[]>([]);
  const [index, setIndex] = useState(0);
  const [originalSelectedPurchaseDetail, setOriginalSelectedPurchaseDetail] = useState<CreateRefundDetail>();
  const [quantity, setQuantity] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();

  const onSubmit = async (values: z.infer<typeof refundSchema>) => {
    setIsLoading(true);
    try {
      values.refundDetail = [];

      refundDetailList.forEach((pd) => {
        values.refundDetail.push({
          purchaseDetailId: parseInt(pd.purchaseDetailId),
          quantity: pd.quantity,
        });
      });

      await RefundService.createRefund({
        purchaseId: parseInt(values.purchaseId),
        comment: values.comment,
        userDNI: user!.dni,
        refundDetail: values.refundDetail,
      });

      toast({
        variant: "default",
        title: "Devolución registrada exitosamente",
      });

      form.reset();
      setRefundDetailList([]);
      setQuantity(0);
      setSelectedPurchaseDetail(undefined);
      refetch();
      refetchPurchases();
      refetchProducts();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al registrar una devolución",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al registrar una devolución",
      });
      throw error;
    }
    setIsLoading(false);
    setIsSheetOpen(false);
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
  };

  const onClick = (udjusment: number) => {
    setQuantity(quantity + udjusment);
  };

  const handleCancelSelected = () => {
    if (isEditing && originalSelectedPurchaseDetail) {
      setRefundDetailList((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 0, originalSelectedPurchaseDetail);
        return newList;
      });
      setIndex(0);
      setIsEditing(false);
      setOriginalSelectedPurchaseDetail(undefined);
      setSelectedPurchaseDetail(undefined);

      setQuantity(0);
    } else {
      setSelectedPurchaseDetail(undefined);

      setQuantity(0);
    }
  };

  const form = useForm({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      purchaseId: "",
      comment: "",
      refundDetail: [],
    },
  });

  const addProduct = (product: PurchaseDetail) => {
    setSelectedPurchaseDetail({
      purchaseDetailId: product.id,
      purchaseDetail: {
        ...product,
        unitPrice: product.unitPrice.toString(),
      },
      quantity: 1,
    });
  };

  const addRefundDetail = () => {
    if (selectedPurchaseDetail) {
      setRefundDetailList([
        ...refundDetailList,
        {
          purchaseDetailId: selectedPurchaseDetail.purchaseDetailId,
          purchaseDetail: selectedPurchaseDetail.purchaseDetail,
          quantity: quantity,
        },
      ]);

      setQuantity(0);
      setSelectedPurchaseDetail(undefined);
    }
  };

  const removeRefundDetail = (refundDetail: CreateRefundDetail) => {
    setRefundDetailList(refundDetailList.filter((pd) => pd.purchaseDetailId !== refundDetail.purchaseDetailId));
  };

  const handleEditRefundDetail = (refundDetail: CreateRefundDetail, index: number) => {
    setIndex(index);
    setOriginalSelectedPurchaseDetail(refundDetail);

    setRefundDetailList((prevList) => prevList.filter((pd) => pd.purchaseDetailId !== refundDetail.purchaseDetailId));
    setIsEditing(true);
    setSelectedPurchaseDetail(refundDetail);
    setQuantity(refundDetail.quantity);
  };

  const TotalRefund = () => {
    return refundDetailList.reduce((total, element) => {
      return total + parseFloat(element.purchaseDetail.unitPrice) * element.quantity;
    }, 0);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>Crear Nueva Devolución</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registra una nueva Devolución</SheetTitle>
          <SheetDescription>
            Registra una nueva devolución al proveedor y actualiza el stock y de los productos.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          {/*<form onSubmit={form.handleSubmit(onSubmit)}>*/}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3 py-3 place-items-center">
              {/*Combobox para la compra*/}
              <FormField
                name="purchaseId"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-50">
                    <FormLabel>Compra</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn("w-[220px] justify-between", !field.value && "text-muted-foreground")}
                            >
                              {field.value
                                ? purchases.find((purchase) => purchase.id === Number(field.value))?.bill
                                : "Seleccione una compra"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca una compra..." />
                            <CommandList>
                              <CommandEmpty>Compra no encontrada.</CommandEmpty>
                              <CommandGroup>
                                {purchases.map((purchase) => (
                                  <CommandItem
                                    value={purchase.bill}
                                    key={purchase.id}
                                    onSelect={() => {
                                      form.setValue("purchaseId", purchase.id.toString());
                                      setSelectedPurchase(purchase);

                                      setSelectedPurchaseDetail(undefined);
                                      setRefundDetailList([]);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        purchase.id === Number(field.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {purchase.bill}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Combobox para los detalles de la compra*/}
              <FormField
                name="refundDetails"
                render={() => (
                  <FormItem className="flex flex-col z-10">
                    <FormLabel>Detalles de la compra</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" disabled={!selectedPurchase} role="combobox" className="w-[220px]">
                            Seleccione un producto
                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca un producto..." />
                            <CommandList>
                              {selectedPurchase?.purchaseDetail
                                .filter(
                                  (product) =>
                                    selectedPurchaseDetail?.purchaseDetailId !== product.id &&
                                    !refundDetailList.some((rd) => rd.purchaseDetailId === product.id),
                                )
                                .map((purchaseDetail) => (
                                  <CommandItem
                                    key={purchaseDetail.id}
                                    onSelect={() => {
                                      setQuantity(0);

                                      addProduct(purchaseDetail);
                                    }}
                                  >
                                    <Image
                                      src={purchaseDetail.product.image}
                                      alt={purchaseDetail.product.name}
                                      width={24}
                                      height={24}
                                    />
                                    {purchaseDetail.product.name}
                                  </CommandItem>
                                ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {selectedPurchaseDetail && (
                <Card className="w-[220px]">
                  <CardHeader>
                    <CardTitle className="text-sm">Detalle de la Compra</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <span className="text-xs">{`ID - ${selectedPurchaseDetail.purchaseDetail.productId}`}</span>

                    <div className="grid gap-1 items-center justify-center">
                      <Image
                        className="rounded mx-auto"
                        src={selectedPurchaseDetail.purchaseDetail.product.image}
                        alt={selectedPurchaseDetail.purchaseDetail.product.name}
                        height={80}
                        width={80}
                      />

                      <span className="text-sm">{selectedPurchaseDetail.purchaseDetail.product.name}</span>
                      <span className="text-xs">{selectedPurchaseDetail.purchaseDetail.product.description}</span>

                      <div className="flex items-center m-auto w-[120px]">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 shrink-0 rounded-full"
                          onClick={() => onClick(-1)}
                          disabled={quantity <= 0}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                          <div className="text-l font-bold tracking-tighter">{quantity.toString()}</div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 shrink-0 rounded-full"
                          onClick={() => onClick(1)}
                          disabled={quantity >= selectedPurchaseDetail.purchaseDetail.quantity}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between w-full">
                    <Button
                      type="button"
                      onClick={handleCancelSelected}
                      variant="destructive"
                      className="h-6 px-2 text-xs"
                    >
                      Cancelar
                    </Button>
                    <Button type="button" onClick={() => addRefundDetail()} className="h-6 px-2 text-xs">
                      Agregar
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {refundDetailList.length > 0 && !selectedPurchaseDetail?.purchaseDetail.id && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Producto</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-center">Precio Unitario</TableHead>
                      <TableHead className="hidden md:table-cell">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundDetailList.map((refundDetail, index) => (
                      <TableRow key={refundDetail.purchaseDetailId}>
                        <TableCell className="text-center">{refundDetail.purchaseDetail.product.name}</TableCell>
                        <TableCell className="text-center">{refundDetail.quantity}</TableCell>
                        <TableCell className="text-center">{refundDetail.purchaseDetail.unitPrice}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeRefundDetail(refundDetail)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleEditRefundDetail(refundDetail, index)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {!selectedPurchaseDetail?.purchaseDetail.id && (
                <FormField
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentario</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ingrese su comentario"
                          className="resize-none w-[330px] h-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {!selectedPurchaseDetail?.purchaseDetail.id && (
              <div className="flex justify-end">
                <FormField
                  name="total"
                  render={() => (
                    <FormItem className="text-right flex items-center gap-2">
                      <FormLabel>Monto Total</FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          value={`S/. ${TotalRefund().toFixed(2)}`}
                          className="ml-auto w-[120px] h-6 text-right"
                          style={{ marginTop: 0 }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <SheetFooter className="mt-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
                <Button type="button" onClick={handleCancel} variant="destructive">
                  Cancelar
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Registrando Devolución
                    </>
                  ) : (
                    <span>Registrar Devolución</span>
                  )}
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
