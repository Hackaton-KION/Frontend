import { instance } from '../request';
import { AuthResponse, LoginParams } from './types';

const baseURL = 'users';

export const auth = () => {
	return instance.get(`${baseURL}/auth`).json();
};

export const login = (params: LoginParams): Promise<AuthResponse> => {
	return instance
		.post(`${baseURL}/authorization/login`, { json: params })
		.json();
};
