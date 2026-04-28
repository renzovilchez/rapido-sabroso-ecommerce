import { useState, useEffect } from "react";

export const useCustomer = () => {
    const [customer, setCustomer] = useState({
        customerId: "",
        firstName: "",
        lastName: "",
        address: "",
        ruc: "",
        dni: "",
        businessName: "",
        taxAddress: "",
        paymentMethod: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));

        if (user) {
            setCustomer({
                customerId: user.customerId || user.id_cliente || "",
                firstName: user.firstName || user.nombre || "",
                lastName: user.lastName || user.apellidos || "",
                address: user.address || user.direccion || "",
                ruc: user.ruc || "",
                dni: user.dni || "",
                businessName: user.businessName || user.razon_social || "",
                taxAddress: user.taxAddress || user.direccion_fiscal || "",
                paymentMethod: user.paymentMethod || user.metodo_pago || "",
            });
        }
    }, []);

    const updateField = (name, value) => {
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    return {
        customer,
        updateField,
        setCustomer,
    };
};