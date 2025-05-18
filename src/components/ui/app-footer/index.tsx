import { Link } from "react-router-dom";
import styles from "./app-footer.module.css";

export const AppFooterUI = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h3>Freezebee Афиша</h3>
          <p>Этот сервис — часть моей курсовой работы. Все мероприятия вымышленные, но все равно спасибо, что заглянули!</p>
        </div>

        <div className={styles.links}>
          <h4>Ссылки</h4>
          <Link to="/">Главная</Link>
          <Link to="/events">События</Link>
          <Link to="/profile">Профиль</Link>
        </div>

        <div className={styles.contacts}>
          <h4>Контакты</h4>
          <a href="https://github.com/Freezebee22" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://t.me/Freezebee22" target="_blank" rel="noreferrer">Telegram</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Freezebee. Все права и лева защищены.</p>
      </div>
    </footer>
  );
};
