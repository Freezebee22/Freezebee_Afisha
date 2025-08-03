import { useMemo } from "react";
import { useSelector } from "../../services/store";
import { EventsItemsUI } from "../ui/events-items";
import { TEventsItemsProps } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

export const EventsItems = ({adminMode = false}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const events = useSelector(store => store.eventsReducer.data);

    const handleAddEvent = () => {
        navigate("event/add", { state: { backgroundLocation: location } });
    };

    return (
        <EventsItemsUI events={events} adminMode={adminMode} onClick={handleAddEvent}></EventsItemsUI>
    );
}