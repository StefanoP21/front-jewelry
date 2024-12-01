"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PDF from "@/components/pdf/PDF";

export default function UnknownPage() {
  return (
    <div>
      <h1>Unknown Page</h1>
      <PDFViewer width={"1200px"} height={"1200px"}>
        <PDF
          companyName="Joyería y Relojería Jenny"
          companyEmail="jrjenny@gmail.com"
          companyPhone="987654321"
          companyWebsite="www.joyeriayrelojeriajenny.com"
          companyAddress="Street 123"
          personName="John smith"
          personEmail="johnsmith@gmail.com"
          personPhone="123456789"
          personAddress="Street 123"
          orderNumber="12345"
          orderDate="10 de Noviembre del 2024"
          chargeToName="Proveedor Corp."
          chargeToEmail="proveedor@corp.com"
          chargeToPhone="123456789"
          chargeToAddress="Street 456"
          shippingAddress="Street 456"
          paymentInstructions="Payment instructions"
          subtotal="S/200"
          discount="50%"
          shippingCost="S/20"
          tax="S/15"
          total="S/185"
          tableData={[
            { description: "Item 1", quantity: 2, price: "S/50", discount: "S/10" },
            { description: "Item 2", quantity: 1, price: "S/100", discount: "S/20" },
          ]}
        />
      </PDFViewer>
    </div>
  );
}
