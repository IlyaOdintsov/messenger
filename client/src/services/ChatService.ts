import type { AxiosResponse } from 'axios';
import $api from '../http';
import type { Group } from '../types/chats_Types';

export default class ChatService {
	static async creategroup(formData: FormData): Promise<AxiosResponse<Group>> {
		return $api.post<Group>('/createGroup', formData);
	}
	static async getGroupList(userId: string): Promise<AxiosResponse<Group[]>> {
		return $api.post<Group[]>('/getGroupList', { userId });
	}
}
