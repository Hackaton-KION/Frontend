/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

// import styles from './video-player.module.css';
import { CommonProps } from '@/shared/types';
import { usePlayer, useLoadManifest, useUIConfig } from './lib';

export interface VideoPlayerProps
	extends CommonProps,
		Partial<globalThis.shaka.extern.UIConfiguration> {
	readonly url: string;
	readonly preview: string;
}
const manifestUri =
	'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const { className, preview, url: _, ...rest } = props;
	const [videoRef, setVideoRef] = React.useState<HTMLVideoElement | null>(null);
	const [containerRef, setContainerRef] = React.useState<HTMLDivElement | null>(
		null
	);

	const player = usePlayer(videoRef);

	useLoadManifest(player, manifestUri);
	useUIConfig({
		player,
		videoContainer: containerRef,
		video: videoRef,
		config: rest,
	});

	return (
		<div className={className} ref={setContainerRef}>
			<video poster={preview} ref={setVideoRef}>
				<track default kind='captions' srcLang='en' />
			</video>
		</div>
	);
};
