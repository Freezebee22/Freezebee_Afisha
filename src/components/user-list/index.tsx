import { UserCard } from '../user-card';
import styles from './user-list.module.css';
import { TUserDB, TUserListProps } from './types';
import { TUserData } from '../../api/types';
import { getUsersApi } from '../../api';
import { useEffect, useState } from 'react';

export const UserList = ({ searchQuery }: TUserListProps) => {
    const [users, setUsers] = useState<TUserDB[]>([]);
    const fetchUsers = async () => {
        setUsers(await getUsersApi());
    };

    const filteredUsers = users.filter(user => 
        user.email.includes(searchQuery) || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const updateUserRole = (id: string, role: 'user' | 'admin') => {
        setUsers(prev => prev.map(u => 
            u.id === id ? { ...u, role } : u
        ));
    };

    const handleDeleteUser = (id: string) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={styles.userList}>
            {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} onRoleChange={updateUserRole} onUsersDelete={handleDeleteUser} />
            ))}
        </div>
    );
};