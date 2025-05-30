import { data } from "./data";
import { TEvents, TLoginData, TRegisterData } from "./types";

export const getEventsApi = () => {
    return new Promise<TEvents[]>((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const loginUserApi = ({email, password}: TLoginData) => {
    return new Promise<TLoginData>((resolve, reject) => {
        setTimeout(() => {
            resolve({email, password});
        }, 100);
    })
};

export const registerUserApi = ({name, email, password}: TRegisterData) => {
    return new Promise<TRegisterData>((resolve) => {
        setTimeout(() => {
            resolve({name, email, password});
        }, 100);
    });
};