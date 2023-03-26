/* eslint-disable */
import { Typography } from '@mui/material';
import * as React from 'react';
import cn from 'classnames';

import styles from './video-player.module.css';
import { CommonProps } from '@/shared/types';
import { useToggle } from '@/shared/lib';
import { convertSeconds } from './lib';
import { VideoControls } from '../video-controls';

export interface VideoPlayerProps extends CommonProps {}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const { className } = props;

	const [videoSeconds, setVideoSeconds] = React.useState(0);
	const [videoTime, setVideoTime] = React.useState(''); //Состояние времени видео
	const [playing, { toggleOff, toggle }] = useToggle(); //Состояние воспроизведения
	const [currentTime, setCurrentTime] = React.useState(''); //Состояние текущего времени
	const [progress, setProgress] = React.useState(0);
	const videoRef = React.useRef<HTMLVideoElement>(null);

	const videoHandler = React.useCallback(() => {
		if (!videoRef.current) {
			return;
		}

		if (!playing) {
			videoRef.current.play();
			const time = convertSeconds(videoRef.current.duration);
			setVideoTime(time);
			setVideoSeconds(videoRef.current.duration);
		} else if (playing) {
			videoRef.current.pause();
		}
		toggle();
	}, [playing]);

	function changeTime() {
		if (videoRef.current) {
			setCurrentTime(convertSeconds(videoRef.current.currentTime));
			setProgress((videoRef.current.currentTime / videoSeconds) * 100);
		}
	}

	React.useEffect(() => {
		const id = setInterval(() => {
			if (!videoRef.current) {
				return;
			}
			if (videoRef.current) {
				changeTime();
			}
			if (videoSeconds !== 0) {
				if (videoSeconds === videoRef.current?.currentTime) {
					toggleOff();
				}
			}
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, []);

	//Функция перемотки вперед
	function forward() {
		if (videoRef.current) {
			videoRef.current.currentTime += 10;
			changeTime();
		}
	}
	//Функция перемотки назад
	function back() {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10;
			changeTime();
		}
	}

	const onChangeVolume = (volume: number) => {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.volume = Math.min(1, Math.max(volume, 0));
	};

	return (
		<div className={cn(styles.videoPlayer, className)}>
			<div>
				<Typography className={styles.title}>Сердце пармы</Typography>
			</div>
			<div className={styles.videoConteiner}>
				<video
					className={styles.video}
					ref={videoRef}
					src='/video.mp4'
					// src='http://10.147.19.65:5000/videostream'
					id='video1'></video>
				{playing ? (
					<img
						className={cn(styles.button, styles.controlButton__play)}
						src='/controlicons/пауза.svg'
						alt=''
						onClick={() => videoHandler()}
					/>
				) : (
					<img
						src='/controlicons/play.svg'
						alt=''
						className={cn(styles.button, styles.controlButton__play)}
						onClick={() => videoHandler()}
					/>
				)}
			</div>
			<div className={styles.controlsPlayer}>
				<div className={styles.timeControls}>
					<div className={styles.timeBar}>
						<div
							className={styles.timeBar_progress}
							style={{ width: `${progress}%` }}></div>
					</div>
					<p className={cn(styles.time, styles.progressTime)}>
						{currentTime != '' ? currentTime : '00:00:00'}/
					</p>
					<p className={cn(styles.time, styles.allTime)}>
						{videoTime != '' ? videoTime : '00:00:00'}
					</p>
				</div>
				<VideoControls
					className={styles.controls}
					onForward={forward}
					onBack={back}
					onChangeVolume={onChangeVolume}
				/>
			</div>
		</div>
	);
};
