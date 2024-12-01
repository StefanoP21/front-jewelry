import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

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
    border: "1px solid black",
  },
  largeItem: {
    flex: 2, // Segundo item ocupa una mayor fracción de la fila
    border: "1px solid black",
  },
  verticalRow: {
    flexDirection: "column", // Fila vertical (los elementos se apilan en columna)
  },
  verticalItem: {
    border: "1px solid black",
    justifyContent: "center", // Centrar texto verticalmente
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    padding: 10,
  },
});

const PDF = () => (
  <Document>
    <Page style={styles.page}>
      {/* Una sola fila horizontal con 2 elementos */}
      <View style={styles.row}>
        <View style={styles.smallItem}>
          <Text style={styles.text}>Empresa</Text>
        </View>
        <View style={styles.largeItem}>
          <Text style={styles.text}>Envio</Text>
        </View>
      </View>

      {/* Tres filas verticales debajo de la fila horizontal */}
      <View style={styles.verticalRow}>
        <View style={styles.verticalItem}>
          <Text style={styles.text}>Tabla</Text>
        </View>

        {/* Otra fila horizontal dentro de las verticales */}
        <View style={styles.row}>
          <View style={styles.largeItem}>
            <Text style={styles.text}>Detalles</Text>
          </View>
          <View style={styles.largeItem}>
            <Text style={styles.text}>Pago</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.largeItem}>
            <Text style={styles.text}>Notas</Text>
          </View>
          <View style={styles.smallItem}>
            <Text style={styles.text}>Firma digital</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDF;
