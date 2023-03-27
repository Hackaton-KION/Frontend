import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Controls, Header, Root, Timeline, Video } from './ui';

import { PlayingButton } from './ui/playing-button';
import styles from './video-player.module.css';

export interface VideoPlayerProps extends CommonProps {
	readonly title: string;
	readonly url: string;
	readonly extraControls?: React.ReactElement | null;
	readonly videoStyles?: React.CSSProperties | null;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const { url, className, extraControls, videoStyles, title } = props;
	const videoRef = React.useRef<HTMLVideoElement | null>(null);

	return (
		<Root
			className={cn(styles.container, className)}
			url={url}
			videoRef={videoRef}>
			<Header title={title} />
			<Video ref={videoRef} videoStyles={videoStyles} title={'title'} id={1} />
			<div className={styles.bottom}>
				<Timeline />
				<Controls extraControls={extraControls} />
			</div>
			<PlayingButton />
		</Root>
	);
};
