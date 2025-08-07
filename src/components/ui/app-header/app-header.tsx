import { TAppHeaderUIProps } from "./types";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../../images/logo-dark.svg';
import { ReactComponent as LogoAdmin } from '../../../images/logo-admin-dark.svg';

export const AppHeaderUI = ({username, adminMode}: TAppHeaderUIProps) => {
    return (
    <header className={styles.header}>
      <Link to="/">
        {!adminMode
          ? <Logo width={280} height={50} />
          : <LogoAdmin width={285} height={50} />
        }
      </Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.navItem}>Главная</Link>
        {!adminMode ?
          <>
            <Link to="/categories" className={styles.navItem}>Категории</Link>
            <Link to="/booking" className={styles.navItem}>Корзина</Link>
          </>
          :
          <>
            <Link to="/admin" className={styles.navItem}>События</Link>
            <Link to="/admin/users" className={styles.navItem}>Пользователи</Link>
          </>
        }
        {username ? 
          <Link to="/profile" className={styles.navItem}>Профиль</Link> 
          : <></>
        }
      </nav>
      
      {username ? 
        <Link to="/profile" className={styles.username}>
          <div>👤 {username}</div>
        </Link>
        : 
        <Link to="/login" className={styles.username}>
          <div>👤 {"Войти"}</div>
        </Link>
      }
    </header>
    );
}