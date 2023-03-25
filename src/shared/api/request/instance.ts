import ky from 'ky';

export const instance = ky.create({
	credentials: true,
});
