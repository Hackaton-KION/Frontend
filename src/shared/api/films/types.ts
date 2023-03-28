export interface Film {
	readonly id: number;
	readonly title: string;
	readonly description: string;
	readonly dateReleaseVideo: string;
	readonly urlPreview: string;
	readonly urlVideo: string;
	readonly urlPreprocessedVideo: string;
	readonly manifestURL: string;
}

export interface GetOneParams {
	readonly id: number;
}
