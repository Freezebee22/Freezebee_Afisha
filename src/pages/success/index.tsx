import { Link } from "react-router-dom";
import styles from "./success.module.css";

export const SuccessPage = () => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Билеты оформлены!</h3>
            <p className={styles.text}>Вы можете посмотреть приобретенные билеты, перейдя в профиль</p>
            <Link to={"/"}>
                <button className={styles.button}>На главную</button>
            </Link>
        </div>
    );
};
