import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate, Link } from 'react-router-dom';
import { register, setUserData } from '../../services/slices/user';
import styles from './register.module.css';
import { Preloader } from '../../components/preloader';

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading } = useSelector(store => store.userReducer);

	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorText, setErrorText] = useState('');

	const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await dispatch(register({ name: userName, email, password }));
        //await dispatch(setUserData({name: userName, email}));
        navigate('/profile', { replace: true });
	};

	return (
        <>
        {isLoading ? <Preloader /> : 
        (
            <main className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Регистрация</h1>
                    <form className={styles.form}>
                        <label className={styles.label}>
                            Имя
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                name="name"
                                className={styles.input}
                                required
                            />
                        </label>

                        <label className={styles.label}>
                            E-mail
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className={styles.input}
                                required
                            />
                        </label>

                        <label className={styles.label}>
                            Пароль
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className={styles.input}
                                required
                            />
                        </label>

                        <button className={styles.button} onClick={handleSubmit}>
                            Зарегистрироваться
                        </button>

                        {(errorText) && (
                            <p className={styles.error}>
                                {errorText}
                            </p>
                        )}
                    </form>

                    <div className={styles.helper}>
                        <p>
                            Уже зарегистрированы?
                            <Link to="/login" className={styles.link}> Войти</Link>
                        </p>
                    </div>
                </div>
            </main>
	    )}
    </>
    )
};
