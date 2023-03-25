/* eslint-disable no-unreachable */
/* eslint-disable sonarjs/no-duplicate-string */
import { filmPreview } from '../../assets';
import { instance } from '../request';
import { Film, GetOneParams } from './types';

const baseURL = 'films';

export const getAll = async (): Promise<Film[]> => {
	return instance.get(baseURL).json();
};

const promo: Film[] = [
	{
		id: 1,
		title: 'Знакомство родителей',
		description: 'Ромком о подводных камнях супружеской жизни',
		urlPreprocessedVideo: '',
		urlPreview: filmPreview,
		urlVideo: '',
	},
	{
		id: 2,
		title: 'Знакомство родителей',
		description: 'Ромком о подводных камнях супружеской жизни',
		urlPreprocessedVideo: '',
		urlPreview: filmPreview,
		urlVideo: '',
	},
	{
		id: 3,
		title: 'Знакомство родителей',
		description: 'Ромком о подводных камнях супружеской жизни',
		urlPreprocessedVideo: '',
		urlPreview: filmPreview,
		urlVideo: '',
	},
	{
		id: 4,
		title: 'Знакомство родителей',
		description: 'Ромком о подводных камнях супружеской жизни',
		urlPreprocessedVideo: '',
		urlPreview: filmPreview,
		urlVideo: '',
	}
];

export const getPromo = async (): Promise<Film[]> => {
	return promo;
	return instance.get(`${baseURL}/promo`).json();
};

export const getOne = async (params: GetOneParams): Promise<Film | null> => {
	return instance.get(`${baseURL}/${params.id}`).json();
};
