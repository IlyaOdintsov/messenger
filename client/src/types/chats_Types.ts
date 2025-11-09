export interface Message {
	text: string;
	time: number;
}

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
}

export interface Message {
	chatId: string;
	sender: string;
	text: string;
	createdAt: string;
	messageId: string;
}
