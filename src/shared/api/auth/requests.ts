import { instance } from '../request';
import { LoginParams } from './types';

const baseURL = 'auth';

export const auth = () => {
	return instance.get(`${baseURL}/auth`).json();
};

export const login = (params: LoginParams) => {
	return instance.post(`${baseURL}/login`, { json: params, }).json();
};
