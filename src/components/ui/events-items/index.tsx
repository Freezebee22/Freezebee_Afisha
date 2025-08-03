import { EventsItem } from "../../events-item";
import { TEventsItemsUIProps } from "./types";
import styles from "./events-items.module.css"
import { Link, useLocation } from "react-router-dom";
import { memo } from "react";

export const EventsItemsUI = memo(({events, adminMode, onClick}: TEventsItemsUIProps) => {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.h}>{adminMode ? "Редактирование событий" : "Все события"}</h1>
                {adminMode && <button className={styles.addEvent} onClick={onClick}>+</button>}
            </div>
            <div className={styles.grid}>
                {events.map(ev => (
                    <Link to={`event/${ev.id}`} key={ev.id} state={{ backgroundLocation: location }} style={{ textDecoration: "none" }}>
                        <EventsItem event={ev}/>
                    </Link>
                ))}
            </div>  
        </div>
    );
})