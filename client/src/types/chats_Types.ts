export interface Message {
	text: string;
	time: number;
}

export interface Chat {
	chatId: number;
	title: string;
	lastMessage: Message;
	unreadCounter: number;
	participants: [];
	avatar?: string;
}

// Group ??

// мб типы сообщений
