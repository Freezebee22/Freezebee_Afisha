import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { addEventApi, deleteEventApi, getEventsApi, setEventApi } from "../../../api";
import { TEvents } from "../../../api/types";

export const fetchEvents = createAsyncThunk(
    'fetch/events',
    async () => await getEventsApi()
);

export const editEvent = createAsyncThunk(
    'edit/events',
    async (data: TEvents) => await setEventApi(data)
);

export const addEvent = createAsyncThunk(
    'add/events',
    async (data: Omit<TEvents, "id">) => await addEventApi(data)
);

export const deleteEvent = createAsyncThunk(
    'delete/events',
    async (id: number) => await deleteEventApi(id)
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
        })
        .addCase(editEvent.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(editEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = state.data.map(event => 
                event.id === action.payload.id ? action.payload : event
            );
        })
        .addCase(editEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(addEvent.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(addEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data.push(action.payload);
        })
        .addCase(addEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        .addCase(deleteEvent.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = state.data.filter(event => event.id !== action.payload);
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const eventsReducer = slice.reducer; 