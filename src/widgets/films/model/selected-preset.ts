import { createDomain, sample } from 'effector';
import { userPresetsModel } from '@/entities/presets';
import { Preset } from '@/shared/api';

const selectedPreset = createDomain();

const DEFAULT_PRESET: Preset = {
	blue: 255,
	brightness: 100,
	contrast: 100,
	enableCustomGamma: false,
	green: 255,
	id: -1,
	name: '',
	offEpilepticScene: false,
	red: 255,
	saturation: 1,
	sharpness: 10,
	userId: null,
	isStandard: true,
};

export const $id = selectedPreset.store<number>(1);
export const $selectedPreset = selectedPreset.store(DEFAULT_PRESET);

const $snapshot = selectedPreset.store<null | Preset>(null);

export const selected = selectedPreset.event<number | null>();
export const copy = selectedPreset.event();
export const restore = selectedPreset.event();

sample({
	clock: selected,
	filter: Boolean,
	target: $id,
});

sample({
	source: {
		presets: userPresetsModel.query.$data,
		id: $id,
	},
	fn: ({ presets, id, }) => {
		return (
			presets.find((preset) => preset.id === id) ??
			presets.at(0) ??
			DEFAULT_PRESET
		);
	},
	target: $selectedPreset,
});

sample({
	clock: copy,
	source: $selectedPreset,
	target: $snapshot,
});

sample({
	clock: restore,
	source: $snapshot,
	filter: Boolean,
	target: $selectedPreset,
});
