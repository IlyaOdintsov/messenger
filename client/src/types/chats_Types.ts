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
	lastMessage: string;
	unreadCounter: number;
}
