import { createMutation } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { LoginParams } from '@/shared/api';

const login = createDomain();

const handlerFx = login.effect();

export const mutation = createMutation({
	effect: handlerFx,
});

export const form = createForm<LoginParams>({
	fields: {
		login: {
			init: '',
		},
		password: {
			init: '',
		},
	},
	domain: login,
});

sample({
	clock: form.formValidated,
	target: mutation.start,
});

sample({
	clock: mutation.finished.failure,
	target: form.fields.password.resetValue,
});
