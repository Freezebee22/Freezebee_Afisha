import {TEventInfoUIProps} from './types'
import styles from './event-info.module.css'
import { ticketsCase } from '../../../utils/tickets_case';
import { memo } from 'react';

export const EventInfoUI = memo(({event, count, onClick}: TEventInfoUIProps) => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.image} src={event.image} alt={event.title} />
            <div className={styles.content}>
                <h3 className={styles.title}>{event.title}</h3>
                <div className={styles.categories}>
                {event.categories.map((cat) => (
                    <span key={cat} className={styles.category}>{cat}</span>
                ))}
                </div>
                <p className={styles.description}>{event.description}</p>
                <p className={styles.location}>Место события: {event.location}</p>
                <p className={styles.date}>
                Начало мероприятия: {new Date(event.date).toLocaleDateString()}
                </p>
                <div className={styles.controls}>
                <button onClick={() => onClick(-1)} className={styles.counterBtn} disabled={count <= 0}>-</button>
                <p className={styles.count}>{count}</p>
                <button onClick={() => onClick(1)} className={styles.counterBtn} disabled={count >= 8}>+</button>
                <button className={styles.buyBtn} disabled={count === 0}>
                    {event.price
                    ? `Купить ${count} ${ticketsCase(count)} за ${count * event.price}₽`
                    : `Забронировать ${count} ${ticketsCase(count)}`}
                </button>
                </div>
            </div>
        </div>
    );
});