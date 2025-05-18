import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { getEventsApi } from "../../../api";
import { TEvents } from "../../../api/types";

export const fetchEvents = createAsyncThunk(
    'fetch/events',
    async () => await getEventsApi()
);

type TEventsState = {
    isLoading: boolean;
    error: null | SerializedError;
    data: TEvents[];
};

const initialState: TEventsState = {
    isLoading: true,
    error: null,
    data: []
};

const slice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEvents.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const eventsReducer = slice.reducer; 