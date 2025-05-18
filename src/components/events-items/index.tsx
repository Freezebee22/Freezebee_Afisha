import { useMemo } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { EventsItemsUI } from "../ui/events-items";
import { TEventsItemsProps } from "./types";

export const EventsItems = () => {
    const dispatch = useDispatch();
    const events = useSelector(store => store.eventsReducer.data);

    return (
        <EventsItemsUI events={events}></EventsItemsUI>
    );
}