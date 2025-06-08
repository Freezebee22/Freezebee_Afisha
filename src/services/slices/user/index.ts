import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TEvents, TLoginData, TRegisterData } from "../../../api/types";
import { TBookingState as TTickets } from "../booking";
import { loginUserApi, registerUserApi } from "../../../api";
import { fetchEvents } from "../events";

export const fetchUser = createAsyncThunk(
    'fetch/user',
    async () => 
        await JSON.parse(localStorage.getItem('userData') || "") as TUser // await здесь лишь для имитации запроса на сервер
);

export const setUserData = createAsyncThunk(
    'post/user',
    async (partialData: Partial<TUser>) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const currentData = JSON.parse(localStorage.getItem('userData') || '{}') as TUser;
        const newData: TUser = {
            ...currentData,
            ...partialData,
            tickets: [
                ...(currentData?.tickets || []),
                ...(partialData?.tickets || [])
            ]
        };
        localStorage.setItem('userData', JSON.stringify(newData));
        return newData;
    }
);

export const register = createAsyncThunk<TRegisterData, TRegisterData>(
    'register/user',
    async (data) => {
        const response = await registerUserApi(data);
        localStorage.setItem('auth', 'true');
        return response;
    }
);

export const login = createAsyncThunk<boolean, TLoginData>(
    'login/user',
    async (data, { rejectWithValue }) => {
        const response = await loginUserApi(data);
        const currentData = JSON.parse(localStorage.getItem('userData') || '{}') as TUser;
        console.log(currentData);
        if (!Object.keys(currentData).length) {
            return rejectWithValue(false);
        } else {
            localStorage.setItem('auth', 'true');
            return true;
        }
    }
);

export const logout = createAsyncThunk<boolean>(
    'logout/user',
    async () => {
        localStorage.removeItem('auth');
        return true;
    }
);

/*export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        const response = await logoutApi();

        if (!response.success) {
            return rejectWithValue(response);
        }

        clearTokens();
    }
);*/

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
};

type TUserState = {
    isLoading: boolean,
    isAuthChecked?: boolean;
    isAuthenticated: boolean;
    loginError?: boolean;
    registerError?: boolean;
    data: TUser
}

const initialState: TUserState = {
    isLoading: false,
    isAuthenticated: false,
    data: {
        name: "",
        email: "",
        phone: "",
        payment: null,
        tickets: [],
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
        .addCase(fetchEvents.fulfilled, (state) => {
            state.isAuthChecked = true;
        })
        .addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
            //state.isAuthChecked = false;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
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
        .addCase(login.rejected, (state) => {
            state.loginError = true;
            state.isAuthChecked = true;
        })
        .addCase(login.fulfilled, (state) => {
            state.loginError = false;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
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
        .addCase(logout.fulfilled, (state) => {
            state = initialState;
        });
    }
});

export const {setTickets} = slice.actions;
export const userReducer = slice.reducer;