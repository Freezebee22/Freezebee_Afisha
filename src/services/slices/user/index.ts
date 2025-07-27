import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TEvents, TLoginData, TRegisterData, TUserData } from "../../../api/types";
import { TBookingState as TTickets } from "../booking";
import { checkAuth, loginUserApi, registerUserApi, verifyToken } from "../../../api";
import { fetchEvents } from "../events";

const URL = process.env.API_URL!;

export type TTicketsDB = {
    tickets: {
        eventId: number,
        count: number
    }[]
};

const convertTickets = createAsyncThunk<TTickets, TTicketsDB>(
    'convert/user',
    async (ticketsDB) => {
        const eventIds = ticketsDB.tickets.map(ticket => ticket.eventId);
        const events: TEvents[] = await fetch(
            `${URL}/events?${eventIds.map(id => `id=${id}`).join('&')}`
        ).then(res => res.json());
        
        return ticketsDB.tickets.map(ticket => {
            const event = events.find(e => e.id === ticket.eventId);
            if (!event) throw new Error('Не найдено событие');
            return {
                event,
                count: ticket.count
            }
        })
    }
);

export const fetchUser = createAsyncThunk<TUserData, string>(
    'fetch/user',
    async (userId, { dispatch }) => {
        const response = await fetch(`${URL}/users/${userId}`);
        if (!response.ok) throw new Error('Пользователь не найден');
        const user = await response.json();

        await dispatch(convertTickets({tickets: user?.tickets}));

        return user;
    }
);

export const setUserData = createAsyncThunk(
    'post/user',
    async (partialData: Partial<TUser> | TTicketsDB) => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = await verifyToken(token);
            if (payload) {
                const response = await fetch(`${URL}/users/${payload.userId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(partialData)
                });
                await new Promise(resolve => setTimeout(resolve, 1000));
                return response.json();
            }
        }
        return null;
    }
);

export const register = createAsyncThunk<TRegisterData, TRegisterData>(
    'register/user',
    async (data, { dispatch }) => {
        const user = await registerUserApi(data);
        const token = localStorage.getItem('token');

        if (token) {
            const payload = await verifyToken(token);
            if (payload) {
                dispatch(fetchUser(payload.userId));
            }
        } else {
            await dispatch(login({email: data.email, password: data.password}));
        }

        return user;
    }
);

export const login = createAsyncThunk<TUserData, TLoginData>(
    'login/user',
    async (data, { dispatch }) => {
        const user = await loginUserApi(data);
        dispatch(fetchUser(user.id));
        return user;
    }
);

export const logout = createAsyncThunk<boolean>(
    'logout/user',
    async () => {
        localStorage.removeItem('token');
        return true;
    }
);

export const initializeAuth = createAsyncThunk(
    'initializeAuth/user',
    async (_, { dispatch }) => {
        const tokenPayload = await checkAuth();
        if (tokenPayload) {
            await dispatch(fetchUser(tokenPayload.userId));
            return true;
        }
        return false;
    }
);

export type TUser = {
    name: string,
    email: string,
    phone: string,
    payment?: {
        number: string,
        owner: string,
        code: string,
    } | null,
    tickets: TTickets,
    role: 'user' | 'admin'
};

type TUserState = {
    isLoading: boolean,
    isAuthChecked?: boolean,
    isAuthenticated?: boolean,
    loginError?: boolean,
    registerError?: boolean,
    error: string | null,
    data: TUser
}

const initialState: TUserState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
    data: {
        name: "",
        email: "",
        phone: "",
        payment: null,
        tickets: [],
        role: "user"
    }
}


const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTickets(state, action: PayloadAction<TTickets>) {
            state.data.tickets.push(...action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(initializeAuth.pending, (state) => {
                state.isLoading = true;
            })
        .addCase(initializeAuth.fulfilled, (state, action) => {
            state.isAuthChecked = true;
            state.isLoading = false;
        })
        .addCase(fetchEvents.fulfilled, (state) => {
            state.isAuthChecked = true;
        })
        .addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
            //state.isAuthChecked = false;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = {
                ...action.payload,
                tickets: state.data.tickets
            };
            state.isAuthenticated = true;
            state.isAuthChecked = true;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(convertTickets.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data.tickets = action.payload;
        })
        .addCase(setUserData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setUserData.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(setUserData.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(login.rejected, (state, action) => {
            state.loginError = true;
            state.error = action.error.message || 'Login failed';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loginError = false;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
            //state.data = action.payload as TUser;
        })
        .addCase(register.rejected, (state) => {
            state.registerError = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.registerError = false;
            state.data = {
                ...state.data, 
                name: action.payload.name,
                email: action.payload.email
            };
            state.isAuthenticated = true;
            state.isAuthChecked = true;
        })
        .addCase(logout.fulfilled, () => 
            ({ ...initialState, data: initialState.data})
        );
    }
});

export const {setTickets} = slice.actions;
export const userReducer = slice.reducer;