import { EventsItems } from "../../components/events-items"

export const AdminPage = () => {

    return (
        <>
            <h1>Админ-панель</h1>
            <EventsItems adminMode/>
        </>
    )
}