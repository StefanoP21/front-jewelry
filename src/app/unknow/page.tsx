"use client";

import { PDFViewer } from "@react-pdf/renderer";
import OrderPDF from "@/components/pdf/OrderPDF";

export default function UnknownPage() {
  return (
    <div>
      <h1>Unknown Page</h1>
      <PDFViewer width={"1200px"} height={"1200px"}>
        <OrderPDF
          orderNumber="12345"
          orderDate="10 de Noviembre del 2024"
          chargeToName="John Smith"
          chargeToEmail="proveedor@corp.com"
          chargeToPhone="123456789"
          discount="200"
          paymentInfo="card"
          subtotal="150"
          tax="10"
          total="S/185"
          tableData={[
            { description: "Item 1", quantity: 2, price: "S/50" },
            { description: "Item 2", quantity: 1, price: "S/100" },
          ]}
        />
      </PDFViewer>
    </div>
  );
}
