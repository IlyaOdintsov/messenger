import type { AxiosResponse } from 'axios';
import $api from '../http';
import type { Group } from '../types/chats_Types';

export default class ChatService {
	static async createChat(formData: FormData): Promise<AxiosResponse<Group>> {
		return $api.post('/createChat', formData);
	}
	static async getChatList(userId: string): Promise<AxiosResponse<Group[]>> {
		return $api.post<Group[]>('/getChatList', { userId });
	}
	static async deleteGroup(groupId: string): Promise<AxiosResponse<string>> {
		return $api.delete(`/deleteGroup/${groupId}`);
	}
}
