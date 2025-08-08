import { deleteUserApi, setUserRole } from '../../api';
import { TBookingState as TTickets } from '../../services/slices/booking';
import { TTicketsDB } from '../../services/slices/user';
import { useSelector } from '../../services/store';
import { TUserInfoProps } from './types';
import styles from './user-info.module.css';

export const UserInfo = ({ user, onRoleChange, onUsersDelete }: TUserInfoProps) => {
    const ticketsUser = user.tickets;
    const events = useSelector(store => store.eventsReducer.data);
    const currUser = useSelector(store => store.userReducer.data)
    const tickets = ticketsUser.map((ticket) => {
        const event = events.find(ev => ev.id === ticket.eventId);
        return {
            event,
            count: ticket.count
        }
    }) as TTickets;

    const handleDelete = async (id: string) => {
        if (window.confirm(`Удалить пользователя ${user.name}?`)) {
            await deleteUserApi(id);
            onUsersDelete(id);
        }
    };

    const handleToggleAdmin = async (id: string, role: 'user' | 'admin') => {
        const newRole = role === 'user' ? 'admin' : 'user';
        await setUserRole(id, newRole);
        onRoleChange(id, newRole);
        //window.alert(`Пользователь теперь ${role !== 'user' ? 'НЕ ' : ''}администратор`);
    };

    return (
        <>
            {!tickets.length ?
                <p className={styles.noTickets}>Нет купленных билетов</p>
                :
                <div className={styles.ticketsSection}>
                    <h4 className={styles.sectionTitle}>Купленные билеты:</h4>
                    <ul className={styles.ticketsList}>
                        {tickets.map(ticket => (
                            <li key={ticket.event?.id} className={styles.ticketItem}>
                                <span className={styles.eventName}>{ticket.event?.title}</span>
                                <span className={styles.eventDate}>{new Date(ticket.event?.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <div className={styles.actions}>
                <button 
                    className={`${styles.button} ${styles.deleteButton}`}
                    onClick={() => handleDelete(user.id)}
                >
                    Удалить пользователя
                </button>
                
                <button
                    className={`${styles.button} ${user.role === "admin" ? styles.revokeAdmin : styles.grantAdmin}`}
                    onClick={() => handleToggleAdmin(user.id, user.role)}
                    disabled={currUser.email === user.email}
                    title={currUser.email === user.email ? "Вы не можете изменить свою роль" : ""}
                >
                    {user.role === "admin" ? 'Забрать права админа' : 'Сделать админом'}
                </button>
            </div>
        </>
    );
};