import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchUser, login } from '../../services/slices/user';
import styles from './login.module.css';

export const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { from } = location.state || { from: { pathname: '/' } };
    const { loginError } = useSelector(store => store.userReducer);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

	const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            await dispatch(fetchUser());
            navigate(from.pathname, { replace: true });
        } catch (err) {
            setErrorText('Введены неверные данные');
    }
	};

	return (
		<main className={styles.container}>
			<div className={styles.card}>
				<h1 className={styles.title}>Вход</h1>
				<form className={styles.form}>
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
						Войти
					</button>

					{errorText && <p className={styles.error}>{errorText}</p>}
				</form>

				<div className={styles.helper}>
					<p>
						Нет аккаунта?
						<Link to="/register" className={styles.link}> Зарегистрироваться</Link>
					</p>
					<p className={styles.muted}>Забыли пароль? Печально :(</p>
				</div>
			</div>
		</main>
	);
};
