export type TEvents = {
    id: number,
    title: string,
    description: string,
    categories: string[],
    image: string,
    location: string,
    date: string,
    price: number,
}

export type TLoginData = {
	email: string;
	password: string;
};

export type TRegisterData = {
    name: string,
	email: string;
	password: string;
};