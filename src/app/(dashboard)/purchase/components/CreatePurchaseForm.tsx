import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseService } from "@/core/services/purchase.service";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { usePurchases } from "@/hooks/usePurchases";
import { AxiosError } from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, DollarSign, Edit, LoaderCircle, Minus, Plus, Trash } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/core/models";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CreatePurchaseDetail } from "@/core/models/purchase/model";
import { Separator } from "@radix-ui/react-separator";
import { Slider } from "@/components/ui/slider";
import { useAuthStore } from "@/core/store/auth.store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { IGV } from "@/core/constants";

const purchaseDetailSchema = z.object({
  productId: z.number().min(1, { message: "El producto es requerido" }),
  quantity: z.number().min(1, { message: "La cantidad es requerida" }),
  unitPrice: z.number().min(1, { message: "El precio unitario es requerido" }),
  profit: z.number().min(1, { message: "El margen de ganancia es requerido" }),
});

const purchaseSchema = z.object({
  supplierId: z.string().min(1, { message: "El Proveedor es requerido" }),
  bill: z.string().min(1, { message: "La Factura es requerida" }),
  total: z.number().min(0, { message: "El total debe ser mayor o igual a 0" }),
  purchaseDetail: z.array(purchaseDetailSchema),
});

const suppliers = [
  {
    id: 2,
    email: "example@gmail.com",
    phone: "123456789",
    ruc: "12345678910",
    nameContact: "XD",
    companyName: "XD SAC",
  },
  {
    id: 3,
    email: "empresa@gmail.com",
    phone: "987654321",
    ruc: "98765432100",
    nameContact: "Juan Perez",
    companyName: "Empresa SAC",
  },
];

export function CreatePurchaseForm() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { products, refetch: refetchProducts } = useProducts();
  const { refetch } = usePurchases();
  const { user } = useAuthStore();

  const [selectedProduct, setSelectedProduct] = useState<CreatePurchaseDetail>();
  const [purchaseDetailList, setPurchaseDetailList] = useState<CreatePurchaseDetail[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(0);
  const [originalProduct, setOriginalProduct] = useState<CreatePurchaseDetail | undefined>(undefined);

  const totalUnitPrice = purchaseDetailList.reduce((total, item) => total + item.unitPrice, 0);

  const onClick = (udjusment: number) => {
    setQuantity(quantity + udjusment);
  };

  const addProduct = (product: Product) => {
    setSelectedProduct({
      productId: product.id,
      quantity: 1,
      unitPrice: 0,
      profit: 0,
      product: {
        name: product.name,
        description: product.description,
        image: product.image,
      },
    });
  };

  const addPurchaseDetail = () => {
    if (selectedProduct) {
      setPurchaseDetailList([
        ...purchaseDetailList,
        {
          productId: selectedProduct.productId,
          quantity: quantity,
          unitPrice: selectedProduct.unitPrice,
          profit: profit,
          product: {
            name: selectedProduct.product.name,
            description: selectedProduct.product.description,
            image: selectedProduct.product.image,
          },
        },
      ]);

      setQuantity(0);
      setProfit(0);
      setSelectedProduct(undefined);
    }
  };

  const removePurchaseDetail = (purchaseDetail: CreatePurchaseDetail) => {
    setPurchaseDetailList(purchaseDetailList.filter((pd) => pd.productId !== purchaseDetail.productId));
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    form.reset();
    setPurchaseDetailList([]);
    setQuantity(0);
    setProfit(0);
    setSelectedProduct(undefined);
  };

  const form = useForm({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      supplierId: "",
      bill: "",
      total: totalUnitPrice,
      purchaseDetail: [],
    },
  });

  useEffect(() => {
    form.setValue("total", totalUnitPrice);
  }, [totalUnitPrice, form]);

  const onSubmit = async (values: z.infer<typeof purchaseSchema>) => {
    setIsLoading(true);
    try {
      values.purchaseDetail = [];

      purchaseDetailList.forEach((pd) => {
        values.purchaseDetail.push({
          productId: parseInt(pd.productId),
          quantity: pd.quantity,
          unitPrice: pd.unitPrice,
          profit: pd.profit / 100,
        });
      });

      await PurchaseService.createPurchase({
        supplierId: parseInt(values.supplierId),
        bill: values.bill,
        total: totalUnitPrice * (1 + IGV),
        userDNI: user!.dni,
        purchaseDetail: values.purchaseDetail,
      });

      toast({
        variant: "default",
        title: "Compra registrada exitosamente",
      });

      form.reset();
      setPurchaseDetailList([]);
      setQuantity(0);
      setProfit(0);
      setSelectedProduct(undefined);
      refetch();
      refetchProducts();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error al registrar una compra",
        description:
          (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "Ocurrió un error al registrar una compra",
      });
      throw error;
    }
    setIsLoading(false);
    setIsSheetOpen(false);
  };

  const handleEditPurchaseDetail = (purchaseDetail: CreatePurchaseDetail, index: number) => {
    setIndex(index);
    setOriginalProduct(purchaseDetail);

    setPurchaseDetailList((prevList) => prevList.filter((pd) => pd.productId !== purchaseDetail.productId));
    setIsEditing(true);
    setSelectedProduct(purchaseDetail);
    setQuantity(purchaseDetail.quantity);
    setProfit(purchaseDetail.profit);
  };

  const handleCancelSelected = () => {
    if (isEditing && originalProduct) {
      setPurchaseDetailList((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 0, originalProduct);
        return newList;
      });
      setIndex(0);
      setIsEditing(false);
      setOriginalProduct(undefined);
      setSelectedProduct(undefined);

      setQuantity(0);
      setProfit(0);
    } else {
      setSelectedProduct(undefined);

      setQuantity(0);
      setProfit(0);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>Crear Nueva Compra</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registra una nueva Compra</SheetTitle>
          <SheetDescription>
            Registra una nueva compra y actualiza el stock y el precio de los productos.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3 py-3 place-items-center">
              {/*Combobox para el proveedor*/}
              <FormField
                name="supplierId"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-50">
                    <FormLabel>Provedor</FormLabel>
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
                                ? suppliers.find((supplier) => supplier.id === Number(field.value))?.companyName
                                : "Seleccione un Proveedor"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca un proveedor..." />
                            <CommandList>
                              <CommandEmpty>Proveedor no encontrado.</CommandEmpty>
                              <CommandGroup>
                                {suppliers.map((supplier) => (
                                  <CommandItem
                                    value={supplier.companyName}
                                    key={supplier.id}
                                    onSelect={() => {
                                      form.setValue("supplierId", supplier.id.toString());
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        supplier.id === Number(field.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {supplier.companyName}
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

              {/*Input para el recibo de compra*/}
              <FormField
                name="bill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recibo de Compra</FormLabel>
                    <FormControl>
                      <Input className="w-[220px]" placeholder="Ingrese el numero de recibo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*Combobox para el producto*/}
              <FormField
                name="productId"
                render={() => (
                  <FormItem className="flex flex-col z-10">
                    <FormLabel>Productos</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="w-[220px]">
                            Selecciona un producto
                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca un producto..." />
                            <CommandList>
                              {products
                                .filter(
                                  (product) =>
                                    selectedProduct?.productId !== product.id &&
                                    !purchaseDetailList.some((pd) => pd.productId === product.id),
                                )
                                .map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    onSelect={() => {
                                      setSelectedProduct(undefined);
                                      setQuantity(0);
                                      setProfit(0);

                                      addProduct(product);
                                    }}
                                  >
                                    <Image src={product.image} alt={product.name} width={24} height={24} />
                                    {product.name}
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

              {selectedProduct?.productId && (
                <Card className="w-[220px]">
                  <CardHeader>
                    <CardTitle className="text-sm">Detalle de la Compra</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center text-center">
                    <span className="text-xs">{`ID - ${selectedProduct.productId}`}</span>

                    <div className="grid gap-1 items-center justify-center">
                      <Image
                        className="rounded mx-auto"
                        src={selectedProduct.product.image}
                        alt={selectedProduct.product.name}
                        height={80}
                        width={80}
                      />

                      <span className="text-sm">{selectedProduct.product.name}</span>
                      <span className="text-xs">{selectedProduct.product.description}</span>

                      <div className="flex items-center m-auto w-[120px]">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 shrink-0 rounded-full"
                          onClick={() => onClick(-5)}
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
                          onClick={() => onClick(5)}
                          disabled={quantity >= 999999999}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>

                      <div className="flex items-center justify-center">
                        <DollarSign className="h-4 w-4" />
                        <Input
                          id="unitPrice"
                          type="number"
                          placeholder="0.00"
                          className="w-20 h-6 text-right"
                          value={selectedProduct?.unitPrice ?? ""}
                          onChange={(e) => {
                            const unitPrice = parseFloat(e.target.value);
                            setSelectedProduct((prev) => (prev ? { ...prev, unitPrice } : prev));
                          }}
                        />
                      </div>

                      <div className="relative flex flex-col items-center mt-6">
                        <span className="absolute -top-6 text-sm font-medium">{profit}%</span>
                        <Slider
                          value={[profit]}
                          onValueChange={(value) => setProfit(value[0])}
                          max={100}
                          step={1}
                          className="w-[140px]"
                        />
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
                    <Button type="button" onClick={() => addPurchaseDetail()} className="h-6 px-2 text-xs">
                      Agregar
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {purchaseDetailList.length > 0 && !selectedProduct?.productId && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Producto</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-center">Costo</TableHead>
                      <TableHead className="text-center">%</TableHead>
                      <TableHead className="hidden md:table-cell">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseDetailList.map((purchaseDetail, index) => (
                      <TableRow key={purchaseDetail.productId}>
                        <TableCell className="text-center">{purchaseDetail.product.name}</TableCell>
                        <TableCell className="text-center">{purchaseDetail.quantity}</TableCell>
                        <TableCell className="text-center">{purchaseDetail.unitPrice}</TableCell>
                        <TableCell className="text-center">
                          <div className="">{purchaseDetail.profit}%</div>
                          <div>{(purchaseDetail.unitPrice * (1 + purchaseDetail.profit / 100)).toFixed(2)}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removePurchaseDetail(purchaseDetail)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleEditPurchaseDetail(purchaseDetail, index)}
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
            </div>

            {!selectedProduct?.productId && (
              <div className="mt-2 grid gap-2">
                <div className="flex justify-end">
                  <div className="text-right flex items-center gap-2">
                    <Label className="text-sm">Subtotal</Label>
                    <Input
                      readOnly
                      value={`S/. ${totalUnitPrice.toFixed(2)}`}
                      className="ml-auto w-[120px] h-6 text-right"
                    />
                  </div>
                </div>

                <div className=" flex justify-end">
                  <div className="text-right flex items-center gap-2">
                    <Label className="text-sm">IGV</Label>
                    <Input
                      readOnly
                      value={`S/. ${(totalUnitPrice * IGV).toFixed(2)}`}
                      className="ml-auto w-[120px] h-6 text-right"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <FormField
                    name="total"
                    render={() => (
                      <FormItem className="text-right flex items-center gap-2">
                        <FormLabel>Total</FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            value={`S/. ${(totalUnitPrice + totalUnitPrice * IGV).toFixed(2)}`}
                            className="ml-auto w-[120px] h-6 text-right"
                            style={{ marginTop: 0 }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
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
                      <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Registrando Compra
                    </>
                  ) : (
                    <span>Registrar Compra</span>
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
