import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Definir los tipos de las propiedades (props)
interface TableRowData {
  description: string;
  quantity: number;
  price: string;
}

interface PDFProps {
  orderNumber: string;
  orderDate: string;
  chargeToCompanyName: string;
  chargeToName: string;
  chargeToEmail: string;
  chargeToPhone: string;
  comment: string;
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
    width: "100%", // Asegura que la tabla ocupe todo el ancho disponible
    overflow: "hidden", // Asegura que el contenido no se desborde
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row", // Las celdas estarán en una fila
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 4,
  },
  tableHeader: {
    flex: 1, // Esto asegura que los encabezados ocupen todo el espacio disponible
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "hsl(47.9, 95.8%, 53.1%)",
    padding: 4,
  },
  tableCell: {
    flex: 1, // Esto asegura que las celdas ocupen todo el espacio disponible de la fila
    textAlign: "center",
    fontSize: 12,
  },
});

// Componente PDF que ahora recibe props en inglés
const RefundPDF: React.FC<PDFProps> = ({
  orderNumber,
  orderDate,
  chargeToCompanyName,
  chargeToName,
  chargeToEmail,
  chargeToPhone,
  comment,
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
              <Text style={styles.text}>jrjenny@gmail.com</Text>
              <Text style={styles.text}>123456789</Text>
              <Text style={styles.text}>www.joyeriayrelojeriajenny.com</Text>
              <Text style={styles.text}>av. test 1234</Text>
            </View>
          </View>
        </View>
        <View style={[styles.largeItem, { alignItems: "flex-end" }]}>
          <Text style={styles.text}>Factura de joyería</Text>
          <Text style={styles.text}>Número de devolución: {orderNumber}</Text>
          <Text style={styles.text}>Fecha de devolución: {orderDate}</Text>

          <View style={[styles.verticalRow, { minWidth: "200px", marginTop: "24px" }]}>
            <View style={[styles.verticalItem, { alignItems: "flex-end", marginBottom: "12px" }]}>
              <Text style={styles.text}>Cobrar a</Text>
              <Text style={styles.text}>{chargeToCompanyName}</Text>
              <Text style={styles.text}>{chargeToName}</Text>
              <Text style={styles.text}>{chargeToEmail}</Text>
              <Text style={styles.text}>{chargeToPhone}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tres filas verticales debajo de la fila horizontal */}
      <View style={[styles.verticalRow, { marginTop: "12px" }]}>
        <View style={styles.verticalItem}>
          <Text style={styles.text}>Productos</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Descripción</Text>
            <Text style={styles.tableHeader}>Cantidad</Text>
            <Text style={styles.tableHeader}>Precio</Text>
          </View>
          {tableData.map((data, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{data.description}</Text>
              <Text style={styles.tableCell}>{data.quantity}</Text>
              <Text style={styles.tableCell}>{data.price}</Text>
            </View>
          ))}
        </View>

        {/* Otra fila horizontal dentro de las verticales */}
        <View style={[styles.row, { marginTop: "12px" }]}>
          <View style={styles.largeItem}>
            <Text style={styles.text}>Comentario:</Text>
            <Text style={styles.text}>{comment}</Text>
          </View>
          <View style={[styles.largeItem, { alignItems: "flex-end" }]}>
            <Text style={styles.text}>Total: {total}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default RefundPDF;
