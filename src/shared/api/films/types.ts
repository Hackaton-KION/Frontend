export interface Film {
	readonly id: number;
	readonly title: string;
	readonly description: string | null;
	readonly urlPreview: string;
	readonly urlVideo: string;
	readonly urlPreprocessedVideo: string;
}

export interface GetOneParams {
	readonly id: number;
}
