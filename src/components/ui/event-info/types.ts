import { TEvents } from "../../../api/types"

export type TEventInfoUIProps = {
    event: TEvents,
    count: number,
    onClick: (one: number) => void,
    onSubmit: () => void
};