import { EventsItems } from "../../components/events-items"
import { Preloader } from "../../components/preloader";
import { useSelector } from "../../services/store";

export const Home = () => {
    const isDataLoading = useSelector(store => store.eventsReducer.isLoading);

    return (
        <>
            {isDataLoading ? 
            ( <Preloader /> ) :
            ( <EventsItems /> )}
        </>
    )
};