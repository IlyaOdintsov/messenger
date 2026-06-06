import $api from './http';
import type { AxiosResponse } from 'axios';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';

export default class ContactsService {
	static async addContact(contactId: string): Promise<AxiosResponse<string>> {
		return $api.post<string>(`/addContact`, { contactId });
	}

	static async deleteContact(contactId: string): Promise<AxiosResponse<string>> {
		return $api.delete(`/deleteContact/${contactId}`);
	}

	static async getFriendsList(): Promise<AxiosResponse<IUser[]>> {
		return $api.get(`/getFriendsList`);
	}

	static async getContact(contactId: string): Promise<AxiosResponse<IUser>> {
		return $api.get(`/getContact/${contactId}`);
	}

	static async searchContacts(searchValue: string): Promise<AxiosResponse<IUser[]>> {
		return $api.get(`/searchContacts`, { params: { search: searchValue } });
	}
}
