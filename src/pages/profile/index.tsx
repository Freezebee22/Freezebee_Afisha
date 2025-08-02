import { useEffect, useState } from "react";
import { formatCardNumber, formatPhone } from "../../utils/formatter";
import { PaymentFields } from "../../components/payment-fields";
import styles from "./profile.module.css";
import { fetchDecryptedCardInfo, getFakeStripeToken, removeFakeToken } from "../../utils/user-card";
import { useDispatch, useSelector } from "../../services/store";
import { ticketsCase } from "../../utils/tickets-case";
import { fetchUser, logout, setUserData, TUser } from "../../services/slices/user";
import { Preloader } from "../../components/preloader";
import { Link, useLocation, useNavigate } from "react-router-dom";


export const ProfilePage = () => {
    const {
        name: userName,
        email: userEmail, 
        phone: userPhone,
        role,
        tickets
    } = useSelector(store => store.userReducer.data);
    const isLoading = useSelector(store => store.userReducer.isLoading);

    const [showCardFields, setShowCardFields] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cardOwner, setCardOwner] = useState("");
    const [cardCode, setCardCode] = useState("");
    const [maskedCard, setMaskedCard] = useState<string | null>(null);
    const [isIncorrect, setIsIncorrect] = useState(false);

    const [nameState, setNameState] = useState(userName);
    const [emailState, setEmailState] = useState(userEmail);
    const [phoneState, setPhoneState] = useState(userPhone);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

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
        setNameState(userName);
        setEmailState(userEmail);
        setPhoneState(userPhone);
    }, [userName, userEmail, userPhone]);

    const handleSaveCard = () => {
        const token = getFakeStripeToken(cardNumber, cardOwner, cardCode);
        const decrypted = fetchDecryptedCardInfo(token);
        if (decrypted) {
            setMaskedCard(decrypted.masked);
            setShowCardFields(false);
        } else {
            setMaskedCard(null);
        }
    };

    const handleSaveContacts = () => {
        if (!nameState || !phoneState || !emailState) {
            setIsIncorrect(true);
        } else {
            setIsIncorrect(false);
            const data = {
                name: nameState,
                phone: phoneState,
                email: emailState,
                
            };
            dispatch(setUserData(data));
        }
    };

    const handleLogout = async () => {
        await dispatch(logout());
        //window.location.href = "/login";
        navigate("/login");
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.formPanel}>
                    <h2 className={styles.panelTitle}>Профиль</h2>
                    <label className={styles.label}>
                        Имя
                        <input 
                            className={styles.input} 
                            placeholder="Имя" 
                            value={nameState}
                            onChange={(e) => setNameState(e.target.value)}/>
                    </label>
                    <label className={styles.label}>
                        Email
                        <input
                            type={"email"}
                            className={styles.input}
                            placeholder="E-mail"
                            value={emailState}
                            onChange={(e) => setEmailState(e.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Телефон
                        <input
                            className={styles.input}
                            placeholder="Номер телефона"
                            value={phoneState}
                            maxLength={18}
                            onChange={(e) => setPhoneState(formatPhone(e.target.value))}
                            onClick={() => !phoneState ? setPhoneState("+7 (") : {}}
                        />
                    </label>
                    <div className={styles.saveContainer}>
                        <button className={styles.saveButton} onClick={handleSaveContacts}>
                            Сохранить данные
                        </button>
                        {isLoading &&
                            (
                                <p className={styles.successMessage}>
                                    Данные успешно сохранены!
                                </p>
                            )
                        }
                        {isIncorrect &&
                            (
                                <p className={styles.incorrectMessage}>
                                    Введены некорректные данные!
                                </p>
                            )
                        }
                    </div>

                    <h3 className={styles.sectionTitle}>Платёжная карта</h3>
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
                                <button className={styles.button} onClick={() => setShowCardFields(false)}>←</button>
                                <button className={`${styles.button} ${styles.buttonSave}`} onClick={handleSaveCard}>
                                    Сохранить
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={() => {
                                        removeFakeToken();
                                        setShowCardFields(false);
                                        setCardNumber("");
                                        setCardCode("");
                                        setCardOwner("");
                                        setMaskedCard("");
                                    }}
                                >
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
                    <div className={styles.downButtons}>
                        <button className={`${styles.saveButton} ${styles.logoutButton}`} onClick={handleLogout}>
                            Выйти из аккаунта
                        </button>
                        {role === "admin" && <Link to="/admin" className={styles.adminLink}>Открыть админ-панель</Link>}
                    </div>
                </div>

                <div className={styles.ticketsPanel}>
                    <h2 className={styles.panelTitle}>Ваши билеты</h2>
                    {tickets?.length ? (
                        <div className={styles.list}>
                            {tickets.map(({ event, count }) => (
                                <Link to={`${event.id}`} state={{ backgroundLocation: location }} style={{ textDecoration: "none" }}  key={event.id}>
                                    <div className={styles.card}>
                                            <img src={event.image} alt={event.title} className={styles.image} />
                                            <div className={styles.cardContent}>
                                                <div className={styles.cardLeft}>
                                                    <h3 className={styles.eventTitle}>{event.title}</h3>
                                                    <h3 className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</h3>
                                                </div>
                                                <div className={styles.cardRight}>
                                                    <p className={styles.priceBlock}>
                                                        {count} {ticketsCase(count)}
                                                    </p>
                                                </div>
                                            </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p>Пока нет бронированных билетов</p>
                    )}
                </div>
            </div>
        </>
    )
};