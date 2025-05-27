import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TEvents } from "../../../api/types";

type TBookingPayload = {
    event: TEvents,
    count: number
};

export type TBookingState = TBookingPayload[];

const initialState: TBookingState = [];

const slice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBooking(state, action: PayloadAction<TBookingPayload>) {
            const existing = state.find(b => b.event.id === action.payload.event.id);
            if (existing) {
                existing.count = action.payload.count;
            } else {
                state.push({
                    event: action.payload.event, 
                    count: action.payload.count
                });
            }
        },
        removeBooking(state, action: PayloadAction<{id: number}>) {
            return state.filter(b => b.event.id !== action.payload.id);
        },
        clearBooking() {
            return [];
        }
    },
});

export const { setBooking, removeBooking, clearBooking } = slice.actions;
export const bookingReducer = slice.reducer;