import { motion } from "framer-motion";
import OrderSummary from "../components/OrderSummary";
import PaymentForm from "../components/PaymentForm";

const Payment = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-6 text-[#1f1f1f]"
            >
                Formulario de Pago
            </motion.h1>

            <OrderSummary />
            <PaymentForm />
        </div>
    );
};

export default Payment;
