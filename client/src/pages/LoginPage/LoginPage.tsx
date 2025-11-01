import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { FormInput } from '../../shared';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { checkAuth, login, resetState } from '../../store/slices/AuthSlice';
import { useTypedSelector } from '../../hooks/useAppSelector';
import { LS_ACCESS_TOKEN } from '../../constants/storage';

import eye from '../../assets/eye.svg';
import eyeClosed from '../../assets/eyeClosed.svg';

export const LoginPage = () => {
	const auth = useTypedSelector((state) => state.auth.isAuth);
	const loginError = useTypedSelector((state) => state.auth.error);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState(false);
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		dispatch(resetState());
		if (localStorage.getItem(LS_ACCESS_TOKEN)) {
			dispatch(checkAuth());
		}
	}, []);

	useEffect(() => {
		if (auth) {
			navigate(from, { replace: true });
		}
	}, [auth]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		dispatch(login({ email, password, rememberMe }));
	}

	useEffect(() => {
		if (!auth) {
			setError(loginError || '');
			return;
		}
	}, [loginError]);

	function handleEmailInput(e: string) {
		setError('');
		setEmail(e);
	}

	function handlePasswordInput(e: string) {
		setError('');
		setPassword(e);
	}

	return (
		<div className="container">
			<div className="loginForm">
				<div className="logoWrapper">
					<img src="/logo.svg" alt="logo" />
				</div>

				<h2>Sign in</h2>

				<form method="POST" onSubmit={handleSubmit} action="/submit" autoComplete="off" noValidate>
					<div className="group-wrapper">
						<span>Email address</span>
						<FormInput inputValue={email} callback={handleEmailInput} inputType="email" inputName="email" placeholder="mail@example.com" />

						<span>Password</span>
						<div className="passwordInput">
							<FormInput
								inputValue={password}
								callback={handlePasswordInput}
								inputType={isVisible ? 'text' : 'password'}
								inputName="pass"
								placeholder="* * * * * *"
							/>
							{password && (
								<button
									type="button"
									className="visibilityBtn"
									onClick={() => {
										setIsVisible(!isVisible);
									}}
								>
									{isVisible ? <img src={eye} alt="eye" /> : <img src={eyeClosed} alt="eyeClosed" />}
								</button>
							)}
						</div>
					</div>

					<div className="actions-row">
						<label>
							<input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" name="remember" id="remember" />
							<span className="rememberCheckbox"></span>Remember for 30 days
						</label>
						<Link to="/forgot-password">Forgot password</Link>
					</div>

					{error && <div className="error">{error}</div>}

					<div className="group-wrapper">
						<button className="defaultBtn" type="submit">
							Sign in
						</button>
					</div>

					<div className="navigate-row">
						Don’t have an account?
						<Link to="/register" replace>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
