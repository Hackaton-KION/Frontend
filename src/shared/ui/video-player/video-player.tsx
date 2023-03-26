/* eslint-disable */
import * as React from 'react';
import cn from 'classnames';

import styles from './video-player.module.css';
import { CommonProps } from '@/shared/types';

export interface VideoPlayerProps extends CommonProps {}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const { className } = props;

	const [videoSeconds, setVideoSeconds] = React.useState(0);
	const [videoTime, setVideoTime] = React.useState(''); //Состояние времени видео
	const [playing, setPlaying] = React.useState(false); //Состояние воспроизведения
	const [currentTime, setCurrentTime] = React.useState(''); //Состояние текущего времени
	const [progress, setProgress] = React.useState(0);
	const videoRef = React.useRef<HTMLVideoElement>(null);

	//Функция для паузы/воспроизведения
	function videoHandler(control: string) {
		if (videoRef.current && control === 'play') {
			videoRef.current.play();
			setPlaying(true);
			const video = document.getElementById('video1') as HTMLVideoElement;
			const time = convertSeconds(video.duration);
			setVideoTime(time);
			setVideoSeconds(video.duration);
		} else if (videoRef.current && control === 'pause') {
			videoRef.current.pause();
			setPlaying(false);
		}
	}

	window.setInterval(() => {
		if (videoRef.current) {
			setCurrentTime(convertSeconds(videoRef.current.currentTime));
			setProgress((videoRef.current?.currentTime || 0 / videoSeconds) * 100);
		}
		if (videoSeconds != 0) {
			if (videoSeconds === videoRef.current?.currentTime) {
				setPlaying(false);
			}
		}
	}, 1000);

	//Функция перемотки вперед
	function forward() {
		if (videoRef.current) {
			videoRef.current.currentTime += 10;
		}
	}
	//Функция перемотки назад
	function back() {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10;
		}
	}
	//Функция конвертации секунд в формат hh:mm:ss
	function convertSeconds(seconds: globalThis.GLfloat) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds - hours * 3600) / 60);
		seconds = Math.floor(seconds - hours * 3600 - minutes * 60);

		const timeString =
			hours.toString().padStart(2, '0') +
			':' +
			minutes.toString().padStart(2, '0') +
			':' +
			seconds.toString().padStart(2, '0');

		return timeString;
	}

	return (
		<div className={cn(styles.videoPlayer, className)}>
			<div>
				<h1 className={styles.videoName}>Сердце пармы</h1>
			</div>
			<div className={styles.videoConteiner}>
				<video
					className={styles.video}
					ref={videoRef}
					src='/video.mp4'
					id='video1'></video>
				{playing ? (
					<img
						className={cn(styles.button, styles.controlButton__play)}
						src='/controlicons/пауза.svg'
						alt=''
						onClick={() => videoHandler('pause')}
					/>
				) : (
					<img
						src='/controlicons/play.svg'
						alt=''
						className={cn(styles.button, styles.controlButton__play)}
						onClick={() => videoHandler('play')}
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

				<div className={styles.controlsButtons}>
					<div className={styles.controls}>
						<div className={styles.controls_rewind}>
							<img
								src='/controlicons/перемотка_назад.svg'
								alt=''
								className={cn(styles.button, styles.rewindButton)}
								onClick={back}
							/>
							<img
								src='/controlicons/перемотка_вперед.svg'
								alt=''
								className={cn(styles.button, styles.rewindButton)}
								onClick={forward}
							/>
						</div>
						<div className={styles.controls_volume}>
							<img
								src='/controlicons/звук_иконка.svg'
								alt=''
								className={styles.volumeButton}
							/>
							<div className={styles.volumeBar}>
								<div className={styles.volumeBar_current}></div>
							</div>
							{/* <input type="range" min="0" max="1" step="0.01" onChange={(e)=>{videoRef.current && (videoRef.current.volume = Number(e.target.value))}}/> */}
						</div>
					</div>
					<div className={styles.controls_options}>
						<img
							src='/controlicons/иконка_слабовидящих.svg'
							alt=''
							className={cn(styles.button, styles.optionsButton)}
						/>
						<img
							src='/controlicons/настройки_иконка.svg'
							alt=''
							className={cn(styles.button, styles.settingsButton)}
						/>
						<img
							src='/controlicons/полный_экран_иконка.svg'
							alt=''
							className={cn(styles.button, styles.screenButton)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
