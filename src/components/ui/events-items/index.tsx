import { EventsItem } from "../../events-item";
import { TEventsItemsUIProps } from "./types";
import styles from "./events-items.module.css"
import { Link, useLocation } from "react-router-dom";
import { memo } from "react";

export const EventsItemsUI = memo(({events}: TEventsItemsUIProps) => {
    const location = useLocation();

    return (
        <>
            <h1 className={styles.h}>Все события</h1>
            <div className={styles.grid}>
                {events.map(ev => (
                    <Link to={`/event/${ev.id}`} key={ev.id} state={{ backgroundLocation: location }} style={{ textDecoration: "none" }}>
                        <EventsItem event={ev}/>
                    </Link>
                ))}
            </div>  
        </>
    );
})