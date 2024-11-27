export const IGV = 0.18;

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  YAPE = "YAPE",
  PLIN = "PLIN",
  TRANSFER = "TRANSFER",
}

export const PaymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: "Efectivo",
  [PaymentMethod.CARD]: "Tarjeta",
  [PaymentMethod.YAPE]: "Yape",
  [PaymentMethod.PLIN]: "Plin",
  [PaymentMethod.TRANSFER]: "Transferencia",
};
