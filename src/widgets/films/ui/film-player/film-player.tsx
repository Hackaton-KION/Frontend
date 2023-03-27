import { useUnit } from 'effector-react';
import * as React from 'react';
import { VideoAccessability, videoAccessabilityModel } from '@/features/film';
import { CommonProps } from '@/shared/types';
import { VideoPlayer } from '@/shared/ui';

export interface FilmPlayerProps extends CommonProps {
	readonly url: string;
}

export const FilmPlayer: React.FC<FilmPlayerProps> = (props) => {
	const { className, url, } = props;

	const { brightness, contrast, saturation, } = useUnit(
		videoAccessabilityModel.form.$values
	);

	const videoStyles: React.CSSProperties = {
		filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation})`,
	};

	return (
		<VideoPlayer
			className={className}
			url={url}
			videoStyles={videoStyles}
			extraControls={<VideoAccessability />}
		/>
	);
};
