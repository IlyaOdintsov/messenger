import type { AxiosResponse } from 'axios';
import $api from '../http';
import type {Message} from '../types/chats_Types';

export default class MessagesService {
    static async getMessagesList(chatId: string): Promise<AxiosResponse<Message[]>> {
        return $api.get<Message[]>(`/getMessagesList/${chatId}`);
    }
}
