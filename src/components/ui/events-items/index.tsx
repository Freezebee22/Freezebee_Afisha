import { EventsItem } from "../../events-item";
import { TEventsItemsUIProps } from "./types";
import styles from "./events-items.module.css"
import { Link, useLocation } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Preloader } from "../../preloader";
import { TEvents } from "../../../api/types";

export const EventsItemsUI = memo(({events, adminMode, onClick}: TEventsItemsUIProps) => {
    const location = useLocation();

    const [displayedEvents, setDisplayedEvents] = useState<TEvents[]>([]);

    useEffect(() => {
        setDisplayedEvents(events.slice(0, 9));
    }, []);

    const loadMore = () => {
        setDisplayedEvents(events.slice(0, displayedEvents.length + 9));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.h}>{adminMode ? "Редактирование событий" : "Все события"}</h1>
                {adminMode && <button className={styles.addEvent} onClick={onClick} title={"Добавить событие"}>+</button>}
            </div>
            <InfiniteScroll
                    dataLength={displayedEvents.length}
                    next={loadMore}
                    hasMore={displayedEvents.length < events.length}
                    loader={<Preloader />}
                    scrollThreshold={0.7}
                >
                <div className={styles.grid}>
                        {displayedEvents.map(ev => (
                            <Link to={`event/${ev.id}`} key={ev.id} state={{ backgroundLocation: location }} style={{ textDecoration: "none" }}>
                                <EventsItem event={ev}/>
                            </Link>
                        ))}
                </div>  
            </InfiniteScroll>
        </div>
    );
})