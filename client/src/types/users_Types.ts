export interface IFormData {
	avatarUrl: File | null;
	firstName: string;
	secondName: string;
	email: string;
	password: string;
	isEmailConfirmed: boolean;
}

export interface User {}

export interface Participant extends User {}
