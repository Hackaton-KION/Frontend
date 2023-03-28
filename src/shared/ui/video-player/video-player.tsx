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
	readonly red: number;
	readonly green: number;
	readonly blue: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const {
		url,
		className,
		extraControls,
		videoStyles,
		title,
		red,
		green,
		blue,
	} = props;
	const videoRef = React.useRef<HTMLVideoElement | null>(null);
	// const [key, setKey] = React.useState('')

	// const onKeyDown = (e: any) => {
	// 	setKey(e.key)
	// };

	// React.useEffect(()=>{
	// 	document.addEventListener('keyup', onKeyDown)
	// 	return () => {
	// 		document.removeEventListener("keydown", onKeyDown);
	// 	};
	// }, [key])

	return (
		<Root
			className={cn(styles.container, className)}
			url={url}
			videoRef={videoRef}>
			<Header title={title} />
			<Video
				ref={videoRef}
				videoStyles={videoStyles}
				red={red}
				green={green}
				blue={blue}
			/>
			<div className={styles.bottom}>
				<Timeline />
				<Controls extraControls={extraControls} />
			</div>
			<PlayingButton />
		</Root>
	);
};
