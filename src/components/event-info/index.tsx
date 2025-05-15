import { useParams } from 'react-router-dom';
import { EventInfoUI } from '../ui/event-info';
import {TEventInfoProps} from './types'
import { useSelector } from '../../services/store';
import { useState } from 'react';

export const EventInfo = () => {
    const { id } = useParams<{ id: string }>();
    const events = useSelector(store => store.eventsReducer.data);
    const [count, setCount] = useState(1);
    const handleClick = (one: number) => {
        setCount(prev => prev + one);
    };

    return <EventInfoUI event={events[Number(id) - 1]} count={count} onClick={handleClick} />;
};