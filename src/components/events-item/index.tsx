import { EventsItemUI } from "../ui/events-item";
import { TEventsItemProps } from "./types";

export const EventsItem = ({event}: TEventsItemProps) => {
    return (
        <EventsItemUI event={event}></EventsItemUI>
    );
}