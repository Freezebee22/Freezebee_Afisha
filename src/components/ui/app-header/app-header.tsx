import { TAppHeaderUIProps } from "./types";
import styles from "./app-header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../../images/logo-dark.svg';

export const AppHeaderUI = ({username}: TAppHeaderUIProps) => {
    return (
    <header className={styles.header}>
      <Link to="/">
        <Logo width={280} height={50} />
      </Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.navItem}>Главная</Link>
        <Link to="/events" className={styles.navItem}>События</Link>
        <Link to="/categories" className={styles.navItem}>Категории</Link>
        {username ? <Link to="/profile" className={styles.navItem}>Профиль</Link> : <></>}
      </nav>

      <div className={styles.username}>👤 {username || "Войти"}</div>
    </header>
    );
}