export interface Preset {
	readonly id: number;
	readonly userId: number;
	readonly name: string;
	readonly brightness: number;
	readonly contrast: number;
	readonly saturation: number;
	readonly sharpness: number;
	readonly offEpilepticScene: boolean;
	readonly enableCustomGamma: boolean;
	readonly redChanel: number;
	readonly greenChanel: number;
	readonly blueChanel: number;
}

export interface CreatePresetParams extends Omit<Preset, 'id' | 'userId'> {}

export interface UpdatePresetParams extends Partial<Preset> {
	readonly id: number;
}

export interface RemovePresetParams {
	readonly id: number;
}