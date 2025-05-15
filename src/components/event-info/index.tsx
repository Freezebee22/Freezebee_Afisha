import { useParams } from 'react-router-dom';
import { EventInfoUI } from '../ui/event-info';
import {TEventInfoProps} from './types'
import { useSelector } from '../../services/store';
import { useState } from 'react';
import { Preloader } from '../preloader';

export const EventInfo = () => {
    const { id } = useParams<{ id: string }>();
    const event = useSelector(store => store.eventsReducer.data.find(e => String(e.id) === id));
    const isLoading = useSelector(store => store.eventsReducer.isLoading);
    const [count, setCount] = useState(1);
    const handleClick = (one: number) => {
        setCount(prev => prev + one);
    };
    
    if (isLoading || !event) {
        return <Preloader />;
    }

    return <EventInfoUI event={event} count={count} onClick={handleClick} />;
};