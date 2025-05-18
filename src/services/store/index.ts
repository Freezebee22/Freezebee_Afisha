import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import { eventsReducer } from "../slices/events";
import { bookingReducer } from "../slices/booking";

const rootReducer = combineReducers({
    eventsReducer,
	bookingReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;