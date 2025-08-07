import { TUserData } from "../../api/types";
import { TTicketsDB, TUser } from "../../services/slices/user";

export type TUserListProps = {
    searchQuery: string
};

export type TUserDB = Omit<TUserData, "tickets"> & TTicketsDB;