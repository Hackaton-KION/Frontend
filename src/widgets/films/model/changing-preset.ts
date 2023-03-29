import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { and, or, not } from 'patronum';
import { createPresetModel, updatePresetModel } from '@/features/presets';
import { userPresetsModel } from '@/entities/presets';
import { Preset } from '@/shared/api';
import { controls } from '@/shared/config';
import { setStage, $isUpdate, $isCreate } from './film-extra-controls';
import { $selectedPreset } from './selected-preset';

const changingPreset = createDomain();

export const $preset = changingPreset.store<Preset | null>(null);
export const $id = $preset.map((preset) => preset?.id ?? null);
export const $has = $id.map(Boolean);

export const $changingStarted = changingPreset.store(false);

export const selected = changingPreset.event<number | null>();
const startChanging = changingPreset.event();
const stopChanging = changingPreset.event();

sample({
	clock: startChanging,
	fn: () => true,
	target: $changingStarted,
});

sample({
	clock: stopChanging,
	fn: () => false,
	target: $changingStarted,
});

querySync({
	source: {
		id: $id,
	},
	controls,
});

sample({
	clock: selected,
	target: $id,
});

sample({
	clock: selected,
	source: userPresetsModel.query.$data,
	filter: (_, id) => Boolean(id),
	fn: (presets, id) => {
		return presets.find((preset) => preset.id === id) ?? null;
	},
	target: $preset,
});

sample({
	clock: setStage,
	filter: or(not($isUpdate), not($has)),
	target: updatePresetModel.form.reset,
});

sample({
	clock: setStage,
	filter: or($isUpdate, $isCreate),
	target: startChanging,
});

sample({
	clock: [updatePresetModel.form.$values, createPresetModel.form.$values],
	filter: $changingStarted,
	fn: (values) => ({ ...values, id: -1, userId: null, isStandard: false, }),
	target: $selectedPreset,
});

sample({
	clock: setStage,
	filter: and(not($isUpdate), not($isCreate)),
	target: stopChanging,
});

sample({
	clock: setStage,
	filter: not($isCreate),
	target: createPresetModel.form.reset,
});

sample({
	clock: setStage,
	filter: not($isUpdate),
	target: updatePresetModel.form.reset,
});

sample({
	clock: $preset,
	filter: and($isUpdate, $preset),
	fn: (preset) => preset!,
	target: updatePresetModel.form.setForm,
});

sample({
	clock: updatePresetModel.form.formValidated,
	source: $id,
	fn: (id, values) => ({ ...values, id: Number(id), }),
	target: updatePresetModel.mutation.start,
});

sample({
	clock: updatePresetModel.mutation.finished.success,
	fn: () => null,
	target: $id,
});

sample({
	clock: updatePresetModel.mutation.finished.success,
	fn: () => 'overview' as const,
	target: setStage,
});
