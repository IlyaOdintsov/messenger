import './styles.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { checkAuth, login, resetState } from '@/FSD_shared/store/slices/AuthSlice.ts';
import { LS_ACCESS_TOKEN } from '@/FSD_shared/config/constants.ts';
import { LoginForm } from '@/FSD_features/auth/login/ui/LoginForm.tsx';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [error, setError] = useState('');

	const auth = useTypedSelector((state) => state.auth.isAuth);
	const isLoggedOut = useTypedSelector((state) => state.auth.isLoggedOut);
	const loginError = useTypedSelector((state) => state.auth.error);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	function handleEmailInput(value: string) {
		setError('');
		setEmail(value);
	}

	function handlePasswordInput(value: string) {
		setError('');
		setPassword(value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		dispatch(login({ email, password, rememberMe }));
	}

	useEffect(() => {
		if (isLoggedOut) return;
		dispatch(resetState());
		if (localStorage.getItem(LS_ACCESS_TOKEN)) {
			dispatch(checkAuth());
		}
	}, []);

	useEffect(() => {
		if (!auth) {
			setError(loginError || '');
			return;
		}
		navigate(from, { replace: true });
	}, [auth, loginError]);

	function fillMailAndPass(acc: '1' | '2') {
		if (acc === '1') {
			setEmail('gabb@gmail.com');
			setPassword('12345Ww@');
		} else if (acc === '2') {
			setEmail('gag@gmail.com');
			setPassword('12345Ww@');
		}
	}

	return (
		<div className="center-screen">
			<div className="container max-w-25 loginPage">
				<img src="/logo.svg" alt="logo" className="avatar-xxl" />

				<h2>Sign in</h2>

				<LoginForm
					LoginValue={email}
					PasswordValue={password}
					handleLoginInput={handleEmailInput}
					handlePasswordInput={handlePasswordInput}
					SubmitForm={handleSubmit}
				/>

				<div className="flex flex-between w-full">
					<label className="flex gap-2 pointer">
						<input className="hidden" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} type="checkbox" name="remember" id="remember" />
						<span className="rememberCheckbox"></span>Remember for 30 days
					</label>
					<Link to="/forgot-password">Forgot password</Link>
				</div>

				{error && <div className="error">{error}</div>}

				<button form="login-form" type="submit" className="w-full btn btn-primary">
					Sign in
				</button>

				<div className="flex gap-2">
					Don’t have an account?
					<Link to="/register" replace>
						Sign up
					</Link>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<div style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => fillMailAndPass('1')}>
						Заполнить данные
					</div>

					<div style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => fillMailAndPass('2')}>
						Заполнить данные #2
					</div>
				</div>
			</div>
		</div>
	);
};
