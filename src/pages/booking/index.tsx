import { useNavigate } from 'react-router-dom';
import styles from './booking.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../services/store';
import { clearBooking, removeBooking } from '../../services/slices/booking';
import { ticketsCase } from '../../utils/tickets-case';

export const BookingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookingEvents = useSelector(store => store.bookingReducer);
    const total = bookingEvents?.reduce((acc, cur) => acc + cur.count * cur.event.price, 0);

    const handleRemove = (id: number) => {
        dispatch(removeBooking({ id }));
    };

    const handleClear = () => {
        dispatch(clearBooking());
    };

    const handleSubmit = () => {
        
        navigate("payment");  
    };

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={() => navigate("/")}>
                ← Вернуться
            </button>
            <h2 className={styles.title}>Ваша корзина</h2>
            {bookingEvents.length === 0 ? (
                <p className={styles.empty}>Корзина пуста</p>
            ) : (
                <>
                    <div className={styles.list}>
                        {bookingEvents.map(({ event, count }) => (
                            <div className={styles.card} key={event.id}>
                                <img src={event.image} alt={event.title} className={styles.image} />
                                <div className={styles.content}>
                                    <div className={styles.left}>
                                        <h3 className={styles.eventTitle}>{event.title}</h3>
                                    </div>
                                    <div className={styles.right}>
                                        <p className={styles.priceBlock}>
                                            {event.price ? 
                                                <>
                                                    {event.price}₽ × {count} {ticketsCase(count)} = <span className={styles.total}>{event.price * count}₽</span>
                                                </>
                                                : `${count} ${ticketsCase(count)}`
                                            }
                                        </p>
                                        <button className={styles.removeBtn} onClick={() => handleRemove(event.id)}>
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.totalAmount}>Сумма заказа: {total}₽</p>
                        <button className={styles.clearBtn} onClick={handleClear}>
                            Очистить корзину
                        </button>
                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            Перейти к оформлению
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
