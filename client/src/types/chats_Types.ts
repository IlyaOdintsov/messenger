export interface Message {
	text: string;
	time: number;
}

interface Member {
	userId: string;
	role: 'owner' | 'member';
}

export interface Group {
	id: string;
	avatarUrl: string;
	groupName: string;
	members: Member[];
}

export interface Message {
	chatId: string;
	sender: string;
	text: string;
	createdAt: string;
	messageId: string;
}
