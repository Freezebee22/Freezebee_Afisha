import { useState } from 'react';
import styles from './user-card.module.css';
import { TUserCardProps } from './types';
import { UserInfo } from '../user-info';

export const UserCard = ({ user, onRoleChange, onUsersDelete }: TUserCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
        <div className={`${styles.card} ${user.role === "admin" ? styles.admin : ''}`}>
        <div className={styles.mainInfo} onClick={() => setIsExpanded(!isExpanded)}>
            <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.textInfo}>
            <h3 className={styles.name}>
                {user.name}
                {user.role === "admin" && <span className={styles.adminBadge}>ADMIN</span>}
            </h3>
                <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.toggle}>
                {isExpanded ? '▲' : '▼'}
            </div>
        </div>

        {isExpanded && (
            <div className={styles.expandedContent}>
                <UserInfo user={user} onRoleChange={onRoleChange} onUsersDelete={onUsersDelete}/>
            </div>
        )}
        </div>
    );
};