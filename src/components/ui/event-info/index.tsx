import {TEventInfoUIProps} from './types'
import styles from './event-info.module.css'
import { ticketsCase } from '../../../utils/tickets_case';

export const EventInfoUI = ({event, count, onClick}: TEventInfoUIProps) => {
    return (
        <div className={''}>
            <img className={''} src={event.image} alt={event.title} />
            <div className={''}>
                <h3 className={''}>{event.title}</h3>
                <div className={''}>
                    {event.categories.map((cat) => (
                        <span key={cat} className={''}>{cat}</span>
                    ))}
                </div>
                <p className={''}>{event.description}</p>
                <p className={''}>Место события: {event.location}</p>
                <p>Начало мероприятия: <p className={''}>{new Date(event.date).toLocaleDateString()}</p></p>
                <div>
                    <button onClick={() => onClick(-1)}>-</button> {/* если count 0 то disabled*/}
                    <p>{count}</p>
                    <button onClick={() => onClick(1)}>+</button> {/* если count 8 то disabled*/}
                <button>
                    {event.price ? `Купить ${count} ${ticketsCase(count)} за ${count * event.price}` : `Забронировать билеты`}
                </button>
                </div>
            </div>
        </div>
    );
};