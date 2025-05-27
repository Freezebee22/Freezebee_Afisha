import { TEvents } from "../../../api/types"

export type TEventInfoUIProps = {
    event: TEvents,
    count: number,
    _bought?: boolean,
    onClick: (one: number) => void,
    onSubmit: () => void
};