import { TEvents } from "../../../api/types"

export type TEventAddModalProps = {
    newEvent: Omit<TEvents, "id">,
    onSave: (e: React.FormEvent) => void,
    onChange: (field: keyof TEvents, value: string | number | string[]) => void,
    onCancel: () => void,
};