import { createDomain } from 'effector';
import { createForm } from 'effector-forms';

const videoAccessability = createDomain();

export interface VideoAccessabilityParams {
	readonly brightness: number;
	readonly saturation: number;
	readonly contrast: number;
	readonly sharpness: number;
	readonly offBrightFlash: boolean;
	readonly blockingColorSpecter: boolean;
}

export const form = createForm<VideoAccessabilityParams>({
	fields: {
		blockingColorSpecter: {
			init: false,
		},
		offBrightFlash: {
			init: false,
		},
		brightness: {
			init: 100,
		},
		contrast: {
			init: 100,
		},
		saturation: {
			init: 1,
		},
		sharpness: {
			init: 100,
		},
	},
	domain: videoAccessability,
});
