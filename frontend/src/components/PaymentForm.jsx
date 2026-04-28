import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import PaymentMethodSelector from "./PaymentMethodSelector";
import NewMethodForm from "./NewMethodForm";
import { useCart } from "../hooks/useCart";
import { useCustomer } from "../hooks/useCustomer";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const { customer, updateField } = useCustomer();
  const { cart, total } = useCart();

  const [newMethod, setNewMethod] = useState({ name: "", number: "" });
  const [showForm, setShowForm] = useState(false);
  const [receiptType, setReceiptType] = useState("boleta");
  const [isLoading, setIsLoading] = useState(false);
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await api.getMetodosPago();
        setMethods(res.data);
      } catch (error) {
        console.error("Error al traer métodos de pago:", error);
      }
    };
    fetchMethods();
  }, []);

  useEffect(() => {
    setSelectedMethod(customer.paymentMethod || "");
  }, [customer.paymentMethod]);

  useEffect(() => {
    const savedReceiptType = localStorage.getItem("tipoPago");
    if (savedReceiptType) setReceiptType(savedReceiptType);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleNewMethodChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePaymentMethod = async () => {
    try {
      setIsLoading(true);
      const paymentMethodData = {
        customerId: customer.customerId,
        name: newMethod.name,
        number: newMethod.number,
      };
      await api.crearMetodoPago(paymentMethodData);
      alert("Método de pago creado");
      setNewMethod({ name: "", number: "" });
      setShowForm(false);
      const resMethods = await api.getMetodosPago();
      setMethods(resMethods.data);
    } catch (error) {
      console.error("Error al crear método de pago:", error);
      alert("Hubo un error al crear el método");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceiptTypeChange = (e) => {
    const type = e.target.value;
    setReceiptType(type);
    localStorage.setItem("tipoPago", type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!selectedMethod) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    try {
      const order = {
        customerId: customer.customerId,
        paymentMethodId: selectedMethod,
        deliveryAddress: customer.address || null,
        shippingMethod: "delivery", // Default
        notes: "",
        discount: 0,
        pointsUsed: 0,
        products: cart
          .filter(item => item.type === "product")
          .map(({ productId, quantity, price }) => ({
            productId,
            quantity,
            price,
          })),

        combos: cart
          .filter(item => item.type === "menu")
          .map(({ menuId, quantity, price }) => ({
            menuId,
            quantity,
            price,
          })),
        receiptType: receiptType,
        dni: receiptType === "boleta" ? customer.dni || null : null,
        ruc: receiptType === "factura" ? customer.ruc || null : null,
        businessName: receiptType === "factura" ? customer.businessName || null : null,
        taxAddress: receiptType === "factura" ? customer.taxAddress || null : null,
      };

      // Clean null or empty fields
      const cleanObject = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== null && v !== "" && v !== undefined)
        );

      const cleanedOrder = cleanObject(order);
      console.log("Pedido a enviar:", cleanedOrder);
      const orderRes = await api.crearPedido(cleanedOrder);
      
      localStorage.removeItem("carrito");
      navigate("/comprobante/" + orderRes.data.orderId);
      console.log(orderRes.data)
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
      alert("Ocurrió un error al confirmar el pago.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-[#feefc3] p-6 rounded-xl shadow-sm"
    >
      <PaymentMethodSelector
        methods={methods}
        selectedId={selectedMethod}
        onChange={setSelectedMethod}
        onNew={() => setShowForm(true)}
      />

      <NewMethodForm
        show={showForm}
        newMethod={newMethod}
        isLoading={isLoading}
        onChange={handleNewMethodChange}
        onCreate={handleCreatePaymentMethod}
        onCancel={() => setShowForm(false)}
      />

      <label className="block mb-2 font-semibold text-[#1f1f1f]">Tipo de Comprobante *</label>
      <select
        className="w-full p-2 rounded border border-gray-300 mb-6"
        value={receiptType}
        onChange={handleReceiptTypeChange}
      >
        <option value="boleta">Boleta</option>
        <option value="factura">Factura</option>
      </select>

      {receiptType === "boleta" ? (
        <>
          <Campo label="Primer Nombre" name="firstName" value={customer.firstName || ""} onChange={handleInputChange} />
          <Campo label="Apellidos" name="lastName" value={customer.lastName || ""} onChange={handleInputChange} />
          <Campo label="Dirección" name="address" value={customer.address || ""} onChange={handleInputChange} />
          <Campo label="DNI" name="dni" value={customer.dni || ""} onChange={handleInputChange} required />
        </>
      ) : (
        <>
          <Campo label="Razón Social" name="businessName" value={customer.businessName || ""} onChange={handleInputChange} required />
          <Campo label="RUC" name="ruc" value={customer.ruc || ""} onChange={handleInputChange} required />
          <Campo label="Dirección Fiscal" name="taxAddress" value={customer.taxAddress || ""} onChange={handleInputChange} required />
        </>
      )}

      <button
        type="submit"
        className="bg-[#ebbd34] text-[#1f1f1f] font-semibold py-2 px-4 rounded hover:bg-[#f0d860] transition-colors"
      >
        Confirmar Pago
      </button>
    </motion.form>
  );
};

const Campo = ({ label, name, value, onChange, required = false }) => (
  <>
    <label htmlFor={name} className="block mb-2 font-semibold text-[#1f1f1f]">{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 rounded border border-gray-300 mb-4"
    />
  </>
);

export default PaymentForm;