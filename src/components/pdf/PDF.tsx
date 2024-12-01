import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Definir los tipos de las propiedades (props)
interface TableRowData {
  description: string;
  quantity: number;
  price: string;
  discount: string;
}

interface PDFProps {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  personName: string;
  personEmail: string;
  personPhone: string;
  personAddress: string;
  orderNumber: string;
  orderDate: string;
  chargeToName: string;
  chargeToEmail: string;
  chargeToPhone: string;
  chargeToAddress: string;
  shippingAddress: string;
  paymentInstructions: string;
  subtotal: string;
  discount: string;
  shippingCost: string;
  tax: string;
  total: string;
  tableData: TableRowData[];
}

// Estilos para el layout
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  row: {
    flexDirection: "row", // Fila horizontal
  },
  smallItem: {
    flex: 1, // Primer item ocupa una pequeña fracción de la fila
  },
  largeItem: {
    flex: 2, // Segundo item ocupa una mayor fracción de la fila
  },
  verticalRow: {
    flexDirection: "column", // Fila vertical (los elementos se apilan en columna)
  },
  verticalItem: {
    justifyContent: "center", // Centrar texto verticalmente
  },
  text: {
    fontSize: 12,
    padding: 2,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    padding: 10,
    color: "hsl(47.9, 95.8%, 53.1%)",
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gainsboro",
  },
  tableHeader: {
    backgroundColor: "hsl(47.9, 95.8%, 53.1%)",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    width: "25%",
    fontSize: "12px",
  },
  tableCell: {
    padding: 5,
    textAlign: "center",
    width: "25%",
    fontSize: "12px",
  },
});

// Componente PDF que ahora recibe props en inglés
const PDF: React.FC<PDFProps> = ({
  companyName,
  companyWebsite,
  companyAddress,
  personEmail,
  personPhone,
  orderNumber,
  orderDate,
  chargeToName,
  chargeToEmail,
  chargeToPhone,
  chargeToAddress,
  shippingAddress,
  paymentInstructions,
  subtotal,
  discount,
  shippingCost,
  tax,
  total,
  tableData,
}) => (
  <Document>
    <Page style={styles.page}>
      {/* Una sola fila horizontal con 2 elementos */}
      <View style={styles.row}>
        <View style={styles.smallItem}>
          <Text style={styles.logo}>JR</Text>
          <View style={styles.verticalRow}>
            <View style={styles.verticalItem}>
              <Text style={styles.text}>De</Text>
              <Text style={[styles.text, { marginBottom: "12px" }]}>Joyería y Relojería Jenny</Text>
              <Text style={styles.text}>{companyName}</Text>
              <Text style={styles.text}>{personEmail}</Text>
              <Text style={styles.text}>{personPhone}</Text>
              <Text style={styles.text}>{companyWebsite}</Text>
              <Text style={styles.text}>{companyAddress}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.largeItem, { alignItems: "flex-end" }]}>
          <Text style={styles.text}>Factura de joyería</Text>
          <Text style={styles.text}>Número de orden: {orderNumber}</Text>
          <Text style={styles.text}>Fecha de orden: {orderDate}</Text>

          <View style={[styles.verticalRow, { minWidth: "200px", marginTop: "24px" }]}>
            <View style={[styles.verticalItem, { alignItems: "flex-end", marginBottom: "12px" }]}>
              <Text style={styles.text}>Cobrar a</Text>
              <Text style={styles.text}>{chargeToName}</Text>
              <Text style={styles.text}>{chargeToEmail}</Text>
              <Text style={styles.text}>{chargeToPhone}</Text>
              <Text style={styles.text}>{chargeToAddress}</Text>
            </View>

            <View style={[styles.verticalItem, { alignItems: "flex-end" }]}>
              <Text style={styles.text}>Envío a</Text>
              <Text style={styles.text}>{shippingAddress}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tres filas verticales debajo de la fila horizontal */}
      <View style={styles.verticalRow}>
        <View style={styles.verticalItem}>
          <Text style={styles.text}>Table</Text>
        </View>

        {/* Tabla con 4 campos y 2 filas de ejemplo */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
            <Text style={styles.tableHeader}>Price</Text>
            <Text style={styles.tableHeader}>Discount</Text>
          </View>
          {tableData.map((data, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{data.description}</Text>
              <Text style={styles.tableCell}>{data.quantity}</Text>
              <Text style={styles.tableCell}>{data.price}</Text>
              <Text style={styles.tableCell}>{data.discount}</Text>
            </View>
          ))}
        </View>

        {/* Otra fila horizontal dentro de las verticales */}
        <View style={styles.row}>
          <View style={styles.largeItem}>
            <Text style={styles.text}>{paymentInstructions}</Text>
          </View>
          <View style={[styles.largeItem, { alignItems: "flex-end" }]}>
            <Text style={styles.text}>Subtotal: {subtotal}</Text>
            <Text style={styles.text}>Discount (20%): {discount}</Text>
            <Text style={styles.text}>Shipping Cost: {shippingCost}</Text>
            <Text style={styles.text}>Tax: {tax}</Text>
            <Text style={styles.text}>Total: {total}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDF;
