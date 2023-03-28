import { presetsApi } from '@/shared/api';
import { createMutation } from '@farfetched/core';
import { createDomain } from 'effector';

const removePreset = createDomain();

const handlerFx = removePreset.effect(presetsApi.remove);

export const mutation = createMutation({
	effect: handlerFx,
});
