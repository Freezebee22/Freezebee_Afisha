import { useState } from "react";
import styles from './users.module.css';
import { UserList } from "../../components/user-list";

export const UsersPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Управление пользователями</h1>
            
            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Поиск по email или имени"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <UserList searchQuery={searchQuery} />
        </div>
    );
};
