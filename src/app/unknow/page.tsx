"use client";

import { PDFViewer } from "@react-pdf/renderer";
import PDF from "@/components/pdf/PDF";

export default function UnknownPage() {
  return (
    <div>
      <h1>Unknown Page</h1>
      <PDFViewer width={"1200px"} height={"1200px"}>
        <PDF />
      </PDFViewer>
    </div>
  );
}
