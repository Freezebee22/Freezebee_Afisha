import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TEvents } from "../../../api/types";

export const fetchUser = createAsyncThunk(
    'fetch/user',
    async () => 
        await JSON.parse(localStorage.getItem('userData') || "") as TUser // await здесь лишь для имитации запроса на сервер
);

export const setUserData = createAsyncThunk(
    'post/user',
    async (data: TUser) => {
        await localStorage.setItem('userData', JSON.stringify(data)); // await здесь лишь для имитации запроса на сервер
        return data;
    }
);

type TUser = {
    name: string,
    email: string,
    phone: string,
    payment: {
        number: string,
        owner: string,
        code: string,
    } | null,
    tickets: TEvents | null,
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
        tickets: null,
    }
}


const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
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
        });
    }
});