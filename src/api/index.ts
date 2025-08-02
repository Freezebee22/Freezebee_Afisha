import { TEvents, TLoginData, TRegisterData, TUserData } from "./types";
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const URL = process.env.API_URL!;
const SECRET = new TextEncoder().encode(process.env.SECRET_KEY!);

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

export const setEventApi = async (data: TEvents) => {
    const response = await fetch(`${URL}/events/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (!response?.ok) throw new Error('Ошибка соединения');

    return response.json();
};

export const loginUserApi = async ({email, password}: TLoginData) => {
    const response = await fetch(`${URL}/users?email=${email}`);
    const user = (await response.json())[0] as TUserData;

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) 
        throw new Error('Неверный e-mail или пароль');

    const token = await new SignJWT({ 
        userId: user.id, 
        role: user.role,
        email: user.email
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(SECRET);

    localStorage.setItem('token', token);

    return user;
};

export const registerUserApi = async ({name, email, password}: TRegisterData) => {
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const passwordHash = bcrypt.hashSync(password, salt);

    const response = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, name, passwordHash, role: 'user', phone: '', tickets: []})
    });

    return response.json();
};

export const verifyToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as { userId: string; role: 'user' | 'admin' };
    } catch {
        return null;
    }
};

export const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return verifyToken(token);
};