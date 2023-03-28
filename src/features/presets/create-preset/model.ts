import { createMutation } from '@farfetched/core';
import { createDomain, sample } from 'effector';
import { presetsApi } from '@/shared/api';
import { createFormModel } from '../lib';

const createPreset = createDomain();

const handlerFx = createPreset.effect(presetsApi.create);

export const mutation = createMutation({
	effect: handlerFx,
});

export const form = createFormModel(createPreset);

sample({
	clock: form.formValidated,
	target: mutation.start,
});
