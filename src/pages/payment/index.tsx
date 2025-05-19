import { useEffect, useState } from "react";
import { useSelector } from "../../services/store";
import { PaymentFields } from "../../components/payment-fields";
import { fetchDecryptedCardInfo, getFakeStripeToken } from "../../utils/user-card";
import styles from "./payment.module.css";

export const PaymentPage = () => {
    const {userEmail, userPhone} = {userEmail: "", userPhone: ""}; //useSelector(store => store.userReducer); потом будет

    const [emailState, setEmailState] = useState(userEmail || "");
    const [phoneState, setPhoneState] = useState(userPhone || "");
    const [showCardFields, setShowCardFields] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [cardOwner, setCardOwner] = useState("");
    const [cardCode, setCardCode] = useState("");
    const [maskedCard, setMaskedCard] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("card_token");
        if (token) {
            const decrypted = fetchDecryptedCardInfo(token);
            if (decrypted) {
                setMaskedCard(decrypted.masked);
            }
        }
    }, []);

    const handleSaveCard = () => {
        //if (cardNumber && cardOwner && cardCode) {
            const token = getFakeStripeToken(cardNumber, cardOwner, cardCode);
            const decrypted = fetchDecryptedCardInfo(token);
            if (decrypted) {
                setMaskedCard(decrypted.masked);
                setShowCardFields(false);
            } else {
                setMaskedCard(null);
            }
        //}
        //setShowCardFields(false);
        //setMaskedCard(null);
    };

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                placeholder="E-mail"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
            />
            <input
                className={styles.input}
                placeholder="Номер телефона"
                value={phoneState}
                onChange={(e) => setPhoneState(e.target.value)}
            />
            {showCardFields ? (
                <>
                    <PaymentFields
                        cardNumber={cardNumber}
                        setCardNumber={(e) => setCardNumber(e.target.value)}
                        cardOwner={cardOwner}
                        setCardOwner={(e) => setCardOwner(e.target.value.toUpperCase())}
                        cardCode={cardCode}
                        setCardCode={(e) => setCardCode(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleSaveCard}>
                        Сохранить карту
                    </button>
                </>
            ) : (
                <button
                    className={`${styles.button} ${styles.cardToggleButton}`}
                    onClick={() => setShowCardFields(true)}
                >
                    {maskedCard && maskedCard.length > 15 ? maskedCard : "Добавить карту"}
                </button>
            )}
            <button className={styles.button} onClick={() => {}}>
                Подтвердить
            </button>
        </div>
    );
};