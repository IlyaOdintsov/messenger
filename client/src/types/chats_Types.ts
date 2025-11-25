interface Member {
	userId: string;
	role: 'owner' | 'member';
}

export interface Group {
	type: 'group' | 'private';
	members: Member[];
	id: string;
	avatarUrl: string;
	chatName: string;
	lastMessage: Message;
	createdAt: string;
	updatedAt: string;
}

export interface Message {
	chatId: string;
	sender: string;
	text: string;
	createdAt: string;
	updatedAt: string;
	id: string;
}
