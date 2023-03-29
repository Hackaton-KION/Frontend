import { MediaPlayer } from 'dashjs';
import * as React from 'react';
import { useToggle } from '@/shared/lib';
// import { convertSeconds } from '../lib';
import { VideoPlayerHandlersContext, VideoPlayerStateContext } from './context';

export interface VideoPlayerProviderProps extends React.PropsWithChildren {
	readonly url: string;
	readonly videoRef: React.RefObject<HTMLVideoElement>;
}

export const VideoPlayerProvider: React.FC<VideoPlayerProviderProps> = (
	props
) => {
	const { url, videoRef, children, } = props;
	const [isPlaying, isPlayingControls] = useToggle(); // Состояние воспроизведения
	const [progress, setProgress] = React.useState(0);
	const [volume, setVolume] = React.useState(1);

	const updateTime = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}
		setProgress(
			(videoRef.current.currentTime / videoRef.current.duration) * 100
		);
	}, []);

	const onPlay = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.play();
		isPlayingControls.toggleOn();
	}, []);
	const onStop = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.pause();
		isPlayingControls.toggleOff();
	}, []);
	const onForward = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.currentTime += 10;
		updateTime();
	}, []);
	const onBack = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.currentTime -= 10;
		updateTime();
	}, []);
	const onChangeVolume = React.useCallback((volume: number) => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.volume = Math.min(1, Math.max(volume, 0));
		setVolume(videoRef.current.volume);
	}, []);

	React.useEffect(() => {
		const id = setInterval(() => {
			if (!videoRef.current) {
				return;
			}
			if (videoRef.current) {
				updateTime();
			}

			if (videoRef.current.duration === videoRef.current?.currentTime) {
				isPlayingControls.toggleOff();
			}
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, []);

	React.useEffect(() => {
		const player = MediaPlayer().create();

		player.initialize(videoRef.current!, url, false);
	}, [url]);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const state = {
		isPlaying,
		videoRef,
		progress,
		volume,
	};
	const handlers = React.useMemo(
		() => ({ onBack, onForward, onPlay, onStop, onChangeVolume, }),
		[]
	);
	return (
		<VideoPlayerStateContext.Provider value={state}>
			<VideoPlayerHandlersContext.Provider value={handlers}>
				{children}
			</VideoPlayerHandlersContext.Provider>
		</VideoPlayerStateContext.Provider>
	);
};
