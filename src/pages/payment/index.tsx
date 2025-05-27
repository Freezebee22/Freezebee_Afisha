import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { PaymentFields } from "../../components/payment-fields";
import { fetchDecryptedCardInfo, getFakeStripeToken, removeFakeToken } from "../../utils/user-card";
import styles from "./payment.module.css";
import { formatCardNumber, formatPhone } from "../../utils/formatter";
import { useNavigate } from "react-router-dom";
import { clearBooking } from "../../services/slices/booking";
import { setTickets, setUserData } from "../../services/slices/user";

export const PaymentPage = () => {
    const {email: userEmail, phone: userPhone} = useSelector(store => store.userReducer.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookedTickets = useSelector(store => store.bookingReducer);

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

    useEffect(() => {
        setEmailState(userEmail);
        setPhoneState(userPhone);
    }, [userEmail, userPhone]);

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

    const handleSubmit = () => {
        const isCorrectPhone = phoneState.length === 18;
        const isCorrectEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(emailState);
        if (isCorrectEmail && isCorrectPhone) {
            dispatch(setTickets(bookedTickets));
            dispatch(setUserData({tickets: bookedTickets}));
            dispatch(clearBooking());
            // TODO: отправлять в локал сторадж корзину
            navigate("/booking/success");
        }
    };

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                Контактные данные
                <input
                    type={"email"}
                    className={styles.input}
                    placeholder="E-mail"
                    value={emailState}
                    onChange={(e) => setEmailState(e.target.value)}
                />
                <input
                    className={styles.input}
                    placeholder="Номер телефона"
                    value={phoneState}
                    maxLength={18}
                    onChange={(e) => setPhoneState(formatPhone(e.target.value))}//{(e) => handlePhoneState(e.target)}
                    onClick={() => !phoneState ? setPhoneState("+7 (") : {}}
                />
            </label>
            <p className={styles.label} style={{margin: 0}}>Данные для оплаты</p>
            {showCardFields ? (
                <>
                    <PaymentFields
                        cardNumber={cardNumber}
                        setCardNumber={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        cardOwner={cardOwner}
                        setCardOwner={(e) => setCardOwner(e.target.value.toUpperCase())}
                        cardCode={cardCode}
                        setCardCode={(e) => setCardCode(e.target.value)}
                    />
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() => setShowCardFields(false)}>
                            ←
                        </button>
                        <button className={`${styles.button} ${styles.buttonSave}`} onClick={handleSaveCard}>
                            Сохранить карту
                        </button> 
                        <button className={styles.button} onClick={() => {
                            removeFakeToken(); 
                            setShowCardFields(false);
                            setCardNumber("");
                            setCardCode("");
                            setCardOwner("");
                            setMaskedCard("");
                        }}>
                            🗑️
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className={`${styles.button} ${styles.cardToggleButton}`}
                    onClick={() => setShowCardFields(true)}
                >
                    {maskedCard && maskedCard.length > 15 ? maskedCard : "Добавить карту"}
                </button>
            )}
            <button className={styles.button} onClick={handleSubmit}>
                Подтвердить
            </button>
        </div>
    );
};