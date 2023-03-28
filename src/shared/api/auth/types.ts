export interface LoginParams {
	readonly login: string;
	readonly password: string;
}

export interface AuthUser {
	readonly id: number;
	readonly login: string;
}

export interface AuthResponse extends AuthUser {
	readonly accessToken: string;
}
