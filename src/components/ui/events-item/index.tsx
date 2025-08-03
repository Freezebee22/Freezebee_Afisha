import { TEventsItemUIProps } from "./types";
import styles from "./events-item.module.css";
import { memo } from "react";
import { extraImg } from "../../../utils/extra-img";

export const EventsItemUI = memo(({event}: TEventsItemUIProps) => {
    return (
        <div className={styles.card}>
            <img 
                className={styles.image} 
                src={event.image} 
                alt={event.title}
                onError={(e) => e.currentTarget.src = extraImg}/>
            <div className={styles.content}>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.date}>{new Date(event.date).toLocaleDateString()}</p>
                <p className={styles.place}>{event.location}</p>
                <p className={styles.description}>{event.description}</p>
                <div className={styles.categories}>
                    {event.categories.map((cat) => (
                        <span key={cat} className={styles.category}>{cat}</span>
                    ))}
                </div>
            </div>
        </div>
    );
})