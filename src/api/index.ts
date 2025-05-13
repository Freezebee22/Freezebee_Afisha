import { data } from "./data";
import { TEvents } from "./types";

export const getEventsApi = () => {
    return new Promise<TEvents[]>((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};