import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Controls, Header, Root, Timeline, Video } from './ui';

import { PlayingButton } from './ui/playing-button';
import styles from './video-player.module.css';

export interface VideoPlayerProps extends CommonProps {
	readonly url: string;
	readonly extraControls?: React.ReactElement | null;
	readonly filter: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const { url, className, extraControls, filter, } = props;
	const videoRef = React.useRef<HTMLVideoElement | null>(null);

	return (
		<Root
			className={cn(styles.container, className)}
			url={url}
			videoRef={videoRef}>
			<Header />
			<Video ref={videoRef} filter={filter} />
			<div className={styles.bottom}>
				<Timeline />
				<Controls extraControls={extraControls} />
			</div>
			<PlayingButton />
		</Root>
	);
};
