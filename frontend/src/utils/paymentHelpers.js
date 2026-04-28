export function validatePaymentData(data, receiptType, products) {
  if (!data.customerId) return "No se pudo obtener el ID del cliente.";
  if (!data.paymentMethod) return "Seleccione un método de pago.";
  if (products.length === 0) return "El carrito está vacío.";
  if (receiptType === "boleta" && !data.dni) return "Ingrese el DNI.";
  if (receiptType === "factura" && (!data.ruc || !data.businessName || !data.taxAddress)) {
    return "Complete todos los campos para la factura.";
  }
  return null;
}