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
import { OrderService } from "@/core/services/order.service";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { AxiosError } from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, DollarSign, Edit, LoaderCircle, Minus, Plus, Trash } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/core/models";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CreateOrderDetail } from "@/core/models/order/model";
import { Separator } from "@radix-ui/react-separator";
import { useAuthStore } from "@/core/store/auth.store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { IGV } from "@/core/constants";
import { PaymentMethod, PaymentMethodLabels } from "@/core/constants";
import { useCustomers } from "@/hooks/useCustomers";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const orderDetailSchema = z.object({
  productId: z.number().min(1, { message: "El producto es requerido" }),
  quantity: z.number().min(1, { message: "La cantidad es requerida" }),
  unitPrice: z.number().min(1, { message: "El precio unitario es requerido" }),
});

let purchasePrices: number;

const orderSchema = z
  .object({
    customerId: z.string().min(1, { message: "El cliente es requerido" }),
    paymentMethod: z.string().min(1, { message: "El método de pago es requerido" }),
    total: z.number().min(0, { message: "El total debe ser mayor o igual a 0" }),
    totalDesc: z.coerce.number().min(0, { message: "El total debe ser mayor o igual a 0" }),
    orderDetail: z.array(orderDetailSchema),
  })
  .refine(
    (data) => {
      console.log(purchasePrices);
      return data.totalDesc <= purchasePrices;
    },
    {
      message: "El descuento no puede ser mayor al valor de compra de los productos",
      path: ["totalDesc"],
    },
  );

export function CreateOrderForm() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { products, refetch: refetchProducts } = useProducts();
  const { customers } = useCustomers();
  const { refetch } = useOrders();
  const { user } = useAuthStore();

  const [selectedProduct, setSelectedProduct] = useState<CreateOrderDetail>();
  const [orderDetailList, setOrderDetailList] = useState<CreateOrderDetail[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(0);
  const [originalProduct, setOriginalProduct] = useState<CreateOrderDetail | undefined>(undefined);

  const onClick = (udjusment: number) => {
    setQuantity(quantity + udjusment);
  };

  const addProduct = (product: Product) => {
    setSelectedProduct({
      productId: product.id,
      quantity: 1,
      unitPrice: product.price,
      product: {
        name: product.name,
        description: product.description,
        image: product.image,
        stock: product.stock,
        price: product.price,
        purchasePrice: product.purchasePrice,
      },
    });
  };

  const addOrderDetail = () => {
    if (selectedProduct) {
      setOrderDetailList([
        ...orderDetailList,
        {
          productId: selectedProduct.productId,
          quantity: quantity,
          unitPrice: selectedProduct.unitPrice,
          product: {
            name: selectedProduct.product.name,
            description: selectedProduct.product.description,
            image: selectedProduct.product.image,
            stock: selectedProduct.product.stock,
            price: selectedProduct.product.price,
            purchasePrice: selectedProduct.product.purchasePrice,
          },
        },
      ]);

      setQuantity(0);
      setSelectedProduct(undefined);
    }
  };

  const removeOrderDetail = (orderDetail: CreateOrderDetail) => {
    setOrderDetailList(orderDetailList.filter((pd) => pd.productId !== orderDetail.productId));
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    form.reset();
    setOrderDetailList([]);
    setTotalDesc(0);
    setQuantity(0);
    setSelectedProduct(undefined);
  };

  const [totalDesc, setTotalDesc] = useState(0);
  const totalUnitPrice = orderDetailList.reduce((total, item) => total + item.quantity * item.unitPrice, 0) - totalDesc;
  purchasePrices = orderDetailList.reduce((total, item) => total + item.quantity * item.product.purchasePrice!, 0);

  const form = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: "",
      paymentMethod: "",
      total: totalUnitPrice,
      totalDesc: 0,
      orderDetail: [],
    },
  });

  const handleBlur = () => {
    setTotalDesc(form.getValues("totalDesc"));
  };

  useEffect(() => {
    form.setValue("total", totalUnitPrice);
  }, [totalUnitPrice, form]);

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsLoading(true);
    try {
      values.orderDetail = [];

      orderDetailList.forEach((pd) => {
        values.orderDetail.push({
          productId: parseInt(pd.productId),
          quantity: pd.quantity,
          unitPrice: pd.unitPrice,
        });
      });

      await OrderService.createOrder({
        customerId: parseInt(values.customerId),
        total: totalUnitPrice * (1 + IGV),
        totalDesc: values.totalDesc,
        paymentMethod: PaymentMethod[values.paymentMethod as keyof typeof PaymentMethod],
        userId: user!.id,
        orderDetail: values.orderDetail,
      });

      toast({
        variant: "default",
        title: "Compra registrada exitosamente",
      });

      form.reset();
      setOrderDetailList([]);
      setQuantity(0);
      setTotalDesc(0);
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

  const handleEditOrderDetail = (orderDetail: CreateOrderDetail, index: number) => {
    setIndex(index);
    setOriginalProduct(orderDetail);

    setOrderDetailList((prevList) => prevList.filter((pd) => pd.productId !== orderDetail.productId));
    setIsEditing(true);
    setSelectedProduct(orderDetail);
    setQuantity(orderDetail.quantity);
  };

  const handleCancelSelected = () => {
    if (isEditing && originalProduct) {
      setOrderDetailList((prevList) => {
        const newList = [...prevList];
        newList.splice(index, 0, originalProduct);
        return newList;
      });
      setIndex(0);
      setIsEditing(false);
      setOriginalProduct(undefined);
      setSelectedProduct(undefined);

      setQuantity(0);
    } else {
      setSelectedProduct(undefined);

      setQuantity(0);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>Crear Nueva Venta</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registra una nueva Venta</SheetTitle>
          <SheetDescription>Registra una nueva venta y actualiza el stock de los productos.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-3 py-3 place-items-center">
              {/*Combobox para el cliente*/}
              <FormField
                name="customerId"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-50">
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" role="combobox" className={cn("w-[220px] justify-between")}>
                              {field.value
                                ? customers.find((customer) => customer.id === Number(field.value))?.dni
                                : "Seleccione un Cliente"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca un cliente..." />
                            <CommandList>
                              <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                              <CommandGroup>
                                {customers.map((customer) => (
                                  <CommandItem
                                    value={customer.dni}
                                    key={customer.id}
                                    onSelect={() => {
                                      form.setValue("customerId", customer.id.toString());
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        customer.id === Number(field.value) ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    <div className="flex flex-col">
                                      <div className="font-medium">{customer.name + " " + customer.lastName}</div>
                                      <div className="hidden text-sm text-muted-foreground md:inline">
                                        {customer.dni}
                                      </div>
                                    </div>
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

              {/*Input para el descuento*/}
              <TooltipProvider>
                <Tooltip>
                  <FormField
                    name="totalDesc"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Descuento</FormLabel>
                        <FormControl>
                          <TooltipTrigger type="button">
                            <Input
                              type="number"
                              className="w-[220px] text-right"
                              placeholder="0.00"
                              {...field}
                              onBlur={() => {
                                handleBlur();
                              }}
                            />
                          </TooltipTrigger>
                        </FormControl>
                        <FormMessage className="max-w-[220px]" />
                      </FormItem>
                    )}
                  />
                  <TooltipContent side="top">
                    <p className="text-sm">Precio de compra total: {purchasePrices}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Combobox para el metodo de pago */}
              <FormField
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="flex flex-col z-20">
                    <FormLabel>Metodo de Pago</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" role="combobox" className={cn("w-[220px] justify-between")}>
                              {field.value ? PaymentMethodLabels[field.value as PaymentMethod] : "Seleccione un Metodo"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-0">
                          <Command>
                            <CommandInput placeholder="Busca un metodo..." />
                            <CommandList>
                              <CommandEmpty>No se encontraron métodos.</CommandEmpty>
                              <CommandGroup>
                                {Object.keys(PaymentMethod).map((key) => {
                                  const methodKey = key as keyof typeof PaymentMethod;
                                  return (
                                    <CommandItem
                                      value={methodKey}
                                      key={methodKey}
                                      onSelect={() => {
                                        form.setValue("paymentMethod", methodKey);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === methodKey ? "opacity-100" : "opacity-0",
                                        )}
                                      />
                                      <div className="flex flex-col">
                                        <div className="font-medium">{PaymentMethodLabels[methodKey]}</div>
                                      </div>
                                    </CommandItem>
                                  );
                                })}
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
                                    product.stock > 0 &&
                                    product.price > 0 &&
                                    selectedProduct?.productId !== product.id &&
                                    !orderDetailList.some((pd) => pd.productId === product.id),
                                )
                                .map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    onSelect={() => {
                                      setSelectedProduct(undefined);
                                      setQuantity(0);

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
                  <CardContent className="flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-sm">{selectedProduct.product.name}</span>

                    <div className="grid gap-1 items-center justify-center">
                      <Image
                        className="rounded mx-auto"
                        src={selectedProduct.product.image || ""}
                        alt={selectedProduct.product.name || ""}
                        height={80}
                        width={80}
                      />

                      <div className="flex items-center m-auto w-[120px] mt-2">
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
                          disabled={quantity >= (selectedProduct.product.stock || 0)}
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
                          readOnly
                          placeholder="0.00"
                          className="w-20 h-6 text-right mt-2"
                          value={parseFloat(selectedProduct?.unitPrice.toString()).toFixed(2) ?? ""}
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
                    <Button type="button" onClick={() => addOrderDetail()} className="h-6 px-2 text-xs">
                      Agregar
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {orderDetailList.length > 0 && !selectedProduct?.productId && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Producto</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-center">Precio</TableHead>
                      <TableHead className="hidden md:table-cell">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetailList.map((purchaseDetail, index) => (
                      <TableRow key={purchaseDetail.productId}>
                        <TableCell className="text-center">{purchaseDetail.product.name}</TableCell>
                        <TableCell className="text-center">{purchaseDetail.quantity}</TableCell>
                        <TableCell className="text-center">
                          {parseFloat(purchaseDetail?.unitPrice.toString()).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeOrderDetail(purchaseDetail)}
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleEditOrderDetail(purchaseDetail, index)}
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
                    {totalDesc != 0 ? <Label className="text-xs text-red-500">- {totalDesc}</Label> : ""}
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
                      <LoaderCircle className="h-5 w-5 mr-3 animate-spin" /> Registrando Venta
                    </>
                  ) : (
                    <span>Registrar Venta</span>
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
