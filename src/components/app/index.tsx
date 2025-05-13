import { useEffect } from "react";
import { useDispatch } from "../../services/store";
import { AppHeader } from "../app-header";
import { EventsItems } from "../events-items";
import { fetchEvents } from "../../services/slices/events";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <EventsItems></EventsItems>
        </>
    )
}


export default App;