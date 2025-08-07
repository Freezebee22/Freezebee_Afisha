import { TUserData } from "../../api/types"
import { TUserDB } from "../user-list/types"

export type TUserInfoProps = {
    user: TUserDB,
    onRoleChange: (id: string, role: 'admin' | 'user') => void,
    onUsersDelete: (id: string) => void
}