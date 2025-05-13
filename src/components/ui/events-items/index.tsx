import { EventsItem } from "../../events-item";
import { TEventsItemsUIProps } from "./types";
import styles from "./events-items.module.css"

export const EventsItemsUI = ({events}: TEventsItemsUIProps) => {
    return (
        <>
            <h1 className={styles.h}>Все события</h1>
            <div className={styles.grid}>
                {events.map(ev => (
                    <EventsItem event={ev} key={ev.id}/>
                ))}
            </div>  
        </>
    );
}