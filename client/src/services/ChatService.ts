import type { AxiosResponse } from 'axios';
import $api from '../http';
import type { Group } from '../types/chats_Types';

export default class ChatService {
	static async createChat(formData: FormData): Promise<AxiosResponse<Group>> {
		return $api.post('/createChat', formData);
	}

	static async getChatList(): Promise<AxiosResponse<Group[]>> {
		return $api.get<Group[]>('/getChatList');
	}

	static async deleteGroup(groupId: string): Promise<AxiosResponse<string>> {
		return $api.delete(`/deleteGroup/${groupId}`);
	}

	static async searchChats(searchValue: string): Promise<AxiosResponse<Group[]>> {
		return $api.get(`/searchChats`, { params: { search: searchValue } });
	}
}
