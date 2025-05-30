import { useSelector } from "../../services/store";
import { AppHeaderUI } from "../ui/app-header/app-header";

export const AppHeader = () => {
    const username = useSelector(store => store.userReducer.data.name);
    return <AppHeaderUI username={username}></AppHeaderUI>
}