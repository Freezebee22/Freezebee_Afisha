import { useSelector } from "../../services/store";
import { AppHeaderUI } from "../ui/app-header/app-header";

export const AppHeader = ({adminMode = false}) => {
    const username = useSelector(store => store.userReducer.data.name);
    return <AppHeaderUI username={username} adminMode={adminMode}></AppHeaderUI>
}