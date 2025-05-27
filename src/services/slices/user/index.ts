import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TEvents } from "../../../api/types";
import { TBookingState as TTickets } from "../booking";

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
    error: SerializedError | null,
    data: TUser
}

const initialState: TUserState = {
    isLoading: false,
    error: null,
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
        .addCase(fetchUser.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(setUserData.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(setUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        })
        .addCase(setUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const {setTickets} = slice.actions;
export const userReducer = slice.reducer;