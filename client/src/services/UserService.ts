import type { AxiosResponse } from 'axios';
import $api from '../http';
import type { IUser } from '../types/Auth_Response';

export default class UserService {
	static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users');
	}
}
