import { TEvents } from "../../../api/types"

export type TEventEditModalProps = {
    event: TEvents,
    editedEvent: TEvents,
    onSave: (e: React.FormEvent) => void,
    onChange: (field: keyof TEvents, value: string | number | string[]) => void,
    onCancel: () => void,
};