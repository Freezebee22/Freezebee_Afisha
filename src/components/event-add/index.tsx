import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import { Preloader } from '../preloader';
import { setBooking } from '../../services/slices/booking';
import { TEvents } from '../../api/types';
//import { addEvent } from '../../services/slices/events';
import { EventAddUI } from '../ui/event-add';
import { addEvent } from '../../services/slices/events';

export const EventAdd = () => {
    const isLoading = useSelector(store => store.eventsReducer.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newEvent, setNewEvent] = useState<Omit<TEvents, "id">>({
        title: '',
        description: '',
        categories: [],
        image: '',
        location: '',
        date: '',
        price: 0
    });
    
    if (isLoading) {
        return <Preloader />;
    }

    const handleChange = (field: keyof TEvents, value: string | number | string[]) => {
        setNewEvent(prev => ({ ...prev, [field]: value} as TEvents));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addEvent(newEvent));
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return <EventAddUI
                newEvent={newEvent} 
                onCancel={handleCancel} 
                onChange={handleChange} 
                onSave={handleSubmit} 
            />;
};