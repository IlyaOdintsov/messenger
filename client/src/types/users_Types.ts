export interface FormData {
	avatarUrl: File | null;
	firstName: string;
	secondName: string;
	email: string;
	phone: string;
	password: string;
	isEmailConfirmed: boolean;
}

export interface User {}

export interface Participant extends User {}
