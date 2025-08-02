import { useNavigate, useParams } from 'react-router-dom';
import { EventEditUI } from '../ui/event-edit';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import { Preloader } from '../preloader';
import { setBooking } from '../../services/slices/booking';
import { TEvents } from '../../api/types';
import { editEvent } from '../../services/slices/events';

export const EventEdit = () => {
    const { id } = useParams<{ id: string }>();
    const event = useSelector(store => store.eventsReducer.data.find(e => String(e.id) === id));
    const isLoading = useSelector(store => store.eventsReducer.isLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editedEvent, setEditedEvent] = useState<TEvents | null>(null);

    useEffect(() => {
        if (event) {
            setEditedEvent(event);
        }
    }, [event]);
    
    if (isLoading || !editedEvent || !event) {
        return <Preloader />;
    }

    const handleChange = (field: keyof TEvents, value: string | number | string[]) => {
        setEditedEvent(prev => ({ ...prev, [field]: value} as TEvents));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editEvent(editedEvent));
    };

    const handleCancel = () => {
        setEditedEvent(event);
    };

    return <EventEditUI 
                event={event} 
                editedEvent={editedEvent} 
                onCancel={handleCancel} 
                onChange={handleChange} 
                onSave={handleSubmit} 
            />;
};