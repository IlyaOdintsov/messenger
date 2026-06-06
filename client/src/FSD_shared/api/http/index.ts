import axios from 'axios';
import { SERVER_URL } from '@/FSD_shared/config/constants.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { AuthResponse } from '@/FSD_shared/types/Auth_Response.ts';

export const API_URL = `${SERVER_URL}/api`;

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const isLoggedOut = useTypedSelector((state) => state.auth.isLoggedOut);
		const originalRequest = error.config;
		if (error.response.status == 401 && error.config && !error.config._isRetry && isLoggedOut) {
			originalRequest._isRetry = true;
			try {
				const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
				localStorage.setItem('token', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				console.log('Пользователь не авторизован');
			}
		}
		throw error;
	}
);

export default $api;
