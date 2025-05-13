import { Link } from "react-router-dom";
import styles from "./app-footer.module.css";

export const AppFooterUI = () => {
    return (
    <footer className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navItem}>Главная</Link>
        <Link to="/events" className={styles.navItem}>События</Link>
        <Link to="/categories" className={styles.navItem}>Категории</Link>
      </nav>
    </footer>
    );
}