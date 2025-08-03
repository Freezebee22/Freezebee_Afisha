import { TEvents } from "../../../api/types";

export type TEventsItemsUIProps = {
    events: TEvents[],
    adminMode?: boolean,
    onClick: () => void
};