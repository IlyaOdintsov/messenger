export interface IUser {
	avatarUrl: string;
	email: string;
	firstName: string;
	secondName: string;
	id: string;
    friends: string[];
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}
