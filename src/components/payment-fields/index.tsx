import { memo } from "react";
import { PaymentFieldsUI } from "../ui/payment-fields";
import { TPaymentFieldsProps } from "./types";

export const PaymentFields = memo((props: TPaymentFieldsProps) => (
    <PaymentFieldsUI {...props}/>
));