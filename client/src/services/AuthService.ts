import type { AxiosResponse } from 'axios';
import $api from '../http';
import type { AuthResponse } from '../types/Auth_Response';
import type { FormData } from '../types/users_Types';

export default class AuthService {
	static async login(email: string, password: string, rememberMe: boolean): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/login', { email, password, rememberMe });
	}

	static async registration(formData: FormData): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/registration', { formData });
	}

	static async logout(): Promise<void> {
		return $api.post('/logout');
	}

	static async sendEmailActivationCode(email: string): Promise<void> {
		return $api.post('/sendEmailActivationCode', { email });
	}

	static async activateEmail(email: string, code: string): Promise<AxiosResponse<boolean>> {
		return $api.post('/activateEmail', { email, code });
	}

	static async forgotPassword(email: string): Promise<void> {
		return $api.post('/forgotPassword', { email });
	}

	static async resetPassword(newPassword: string, token: string): Promise<void> {
		return $api.post('/resetPassword', { newPassword, token });
	}
}
