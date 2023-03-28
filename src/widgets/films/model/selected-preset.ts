import { userPresetsModel } from '@/entities/presets';
import { Preset } from '@/shared/api';
import { controls } from '@/shared/config';
import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';

const selectedPreset = createDomain();

export const $preset = selectedPreset.store<Preset | null>(null);
export const $id = $preset.map((preset) => preset?.id ?? null);
export const $has = $id.map(Boolean);

export const selected = selectedPreset.event<number | null>();

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
