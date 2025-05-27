import { useNavigate, useParams } from 'react-router-dom';
import { EventInfoUI } from '../ui/event-info';
import {TEventInfoProps} from './types'
import { useDispatch, useSelector } from '../../services/store';
import { useState } from 'react';
import { Preloader } from '../preloader';
import { setBooking } from '../../services/slices/booking';

export const EventInfo = ({bought}: TEventInfoProps) => {
    const { id } = useParams<{ id: string }>();
    const event = useSelector(store => store.eventsReducer.data.find(e => String(e.id) === id));
    const isLoading = useSelector(store => store.eventsReducer.isLoading);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (isLoading || !event) {
        return <Preloader />;
    }

    const handleClick = (one: number) => {
        setCount(prev => prev + one);
    };
    const handleSubmit = () => {
        dispatch(setBooking({event, count}));
        navigate("/booking");
    };

    return <EventInfoUI event={event} count={count} _bought={bought} onClick={handleClick} onSubmit={handleSubmit} />;
};