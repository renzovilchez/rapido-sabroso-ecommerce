import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import logo from "../assets/images/logos/logo-original.png";
import watermark from "../assets/images/logos/logo-original.png";
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    position: "relative"
  },
  watermark: {
    position: "absolute",
    top: "30%",
    left: "20%",
    opacity: 0.1,
    width: "60%",
  },
  header: { alignItems: "center", marginBottom: 10 },
  logo: { width: 50, height: 50, marginBottom: 5 },
  title: { fontSize: 12, fontWeight: "bold", marginBottom: 3 },
  companyData: { textAlign: "center", marginBottom: 10 },
  infoBox: { marginBottom: 10 },
  bold: { fontWeight: "bold" },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 4
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4
  },
  totals: { marginTop: 10, alignItems: "flex-end" },
  textRight: { textAlign: "right" },
  bottomNote: {
    marginTop: 15,
    fontSize: 9,
    fontStyle: "italic"
  }
});

const ComprobantePDF = ({ comprobante }) => {
  const cliente = comprobante.cliente || {};
  const totales = comprobante.totales || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca de agua */}
        <Image src={watermark} style={styles.watermark} />

        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>RÁPIDO Y SABROSO E.I.R.L.</Text>
          <Text>RUC: 12345678901</Text>
          <Text>Av. America, Trujillo - Perú</Text>
          <Text>Tel: (01) 123-4567</Text>
        </View>

        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 11, marginBottom: 8 }}>
          BOLETA DE VENTA ELECTRÓNICA
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          Serie {comprobante.serie || "B001"} - N° {String(comprobante.numero || 123).padStart(6, "0")}
        </Text>

        <View style={styles.infoBox}>
          <Text>Fecha de emisión: {new Date(comprobante.fechaEmision).toLocaleDateString()}</Text>
          <Text>Cliente: {cliente.nombre || "N/A"}</Text>
          <Text>Documento: {cliente.dni ? `DNI ${cliente.dni}` : cliente.ruc ? `RUC ${cliente.ruc}` : "N/A"}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableColHeader, styles.bold]}>Cant.</Text>
            <Text style={[styles.tableColHeader, styles.bold]}>Descripción</Text>
            <Text style={[styles.tableColHeader, styles.bold]}>P. Unitario</Text>
            <Text style={[styles.tableColHeader, styles.bold]}>Total</Text>
          </View>
          {comprobante.productos?.map((prod, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{prod.cantidad}</Text>
              <Text style={styles.tableCol}>{prod.nombre}</Text>
              <Text style={styles.tableCol}>S/ {parseFloat(prod.precioUnit).toFixed(2)}</Text>
              <Text style={styles.tableCol}>
                S/ {(prod.cantidad * parseFloat(prod.precioUnit)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <Text style={styles.textRight}>
            Subtotal: S/ {parseFloat(totales.subtotal || 0).toFixed(2)}
          </Text>
          <Text style={[styles.textRight, { fontWeight: "bold", fontSize: 11 }]}>
            Total: S/ {parseFloat(totales.total || 0).toFixed(2)}
          </Text>
        </View>

        <Text style={styles.bottomNote}>
          Representación impresa de la boleta electrónica
        </Text>
      </Page>
    </Document>
  );
};

export default ComprobantePDF;