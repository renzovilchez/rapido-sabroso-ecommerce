const PaymentMethodSelector = ({ methods, selectedId, onChange, onNew }) => {
  return (
    <div className="mb-6">
      <label htmlFor="paymentMethod" className="block font-semibold text-[#1f1f1f] mb-2">
        Método de Pago *
      </label>
      <select
        id="paymentMethod"
        name="paymentMethod"
        value={selectedId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-gray-300 mb-2"
      >
        <option value="">Selecciona un método</option>
        {methods.map((method) => (
          <option key={method.paymentMethodId} value={String(method.paymentMethodId)}>
            {method.name} - {method.number}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onNew}
        className="text-sm text-blue-600 hover:underline"
      >
        + Agregar nuevo método
      </button>
    </div>
  );
};

export default PaymentMethodSelector;