import { TPaymentFieldsUIProps } from "./types";
import styles from "./payment-fields.module.css";
import { memo } from "react";

export const PaymentFieldsUI = memo((props: TPaymentFieldsUIProps) => (
    <fieldset className={styles.fieldset}>
        <input
            className={styles.input}
            placeholder="Номер карты*"
            value={props.cardNumber}
            onChange={props.setCardNumber}
            maxLength={19}
            inputMode="numeric"
        />
        <input
            className={styles.input}
            placeholder="Имя владельца*"
            value={props.cardOwner}
            onChange={props.setCardOwner}
            maxLength={20}
        />
        <input
            className={styles.input}
            type="password"
            placeholder="CVC/CVV*"
            value={props.cardCode}
            onChange={props.setCardCode}
            maxLength={3}
            minLength={3}
            inputMode="numeric"
        />
    </fieldset>
));
