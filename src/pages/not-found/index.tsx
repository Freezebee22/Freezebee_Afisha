import { Link } from "react-router-dom";
import styles from "./not-found.module.css";
import { useEffect } from "react";

export const NotFoundPage = () => {
    useEffect(() => {
        document.body.classList.add("body-lock");
        return () => {
            document.body.classList.remove("body-lock");
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.code}>404</h1>
                <h2 className={styles.title}>Страница не найдена</h2>
                <p className={styles.description}>
                    Возможно, вы перешли по неверной ссылке или страница была удалена.
                </p>
                <Link to="/" className={styles.button}>
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};
