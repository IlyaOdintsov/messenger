import type { AxiosResponse } from 'axios';
import $api from './http';
import { Group } from '@/FSD_shared/types/chats_Types.ts';

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

	static async editChat(chatId: string, formData: FormData): Promise<AxiosResponse<Group>> {
		return $api.patch(`/editChat/${chatId}`, formData);
	}

	static async addMemberToGroup(groupId: string, contactId: string): Promise<AxiosResponse<Group>> {
		return $api.post<Group>(`/addMemberToGroup`, { groupId, contactId });
	}
}
