import { TEvents, TLoginData, TRegisterData } from "./types";

const URL = process.env.API_URL;

export const getEventsApi = () => {
    return new Promise<TEvents[]>((resolve, reject) => {
        setTimeout(async () => {
            const response = await fetch(`${URL}/events`);
            if (response?.ok) {
                const data = await response.json();
                resolve(data);
            } else {
                reject('Ошибка соединения');
            }
        }, 300);
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