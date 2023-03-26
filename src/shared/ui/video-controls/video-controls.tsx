import Forward10Icon from '@mui/icons-material/Forward10';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SettingsIcon from '@mui/icons-material/Settings';
import Replay10Icon from '@mui/icons-material/Replay10';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { IconButton, Button, Slider } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps, VoidFunction } from '../../types';
import { EyeIcon } from '../icons';
import { useToggle } from '../../lib';

import styles from './video-controls.module.css';

export interface VideoControlsProps extends CommonProps {
	readonly onForward: VoidFunction;
	readonly onBack: VoidFunction;
	readonly onChangeVolume: (volumne: number) => void;
}

export const VideoControls: React.FC<VideoControlsProps> = (props) => {
	const { onBack, onForward, onChangeVolume, className } = props;
	const [showSlider, { toggle }] = useToggle();

	const handlerChangeVolume = (_: unknown, volume: number | number[]) => {
		onChangeVolume(volume as number);
	};

	return (
		<div className={cn(styles.controls, className)}>
			<div className={styles.groups}>
				<div>
					<IconButton className={styles.button} onClick={onBack}>
						<Replay10Icon className={styles.icon} />
					</IconButton>
					<IconButton className={styles.button} onClick={onForward}>
						<Forward10Icon className={styles.icon} />
					</IconButton>
				</div>
				<IconButton className={styles.button} onClick={toggle}>
					<VolumeUpIcon className={styles.icon} />
				</IconButton>
				{showSlider && (
					<Slider
						className={styles.slider}
						min={0}
						max={1}
						defaultValue={0.5}
						step={0.01}
						onChange={handlerChangeVolume}
						aria-label='Volume'
					/>
				)}
			</div>
			<div className={styles.groups}>
				<IconButton className={styles.button}>
					<EyeIcon className={styles.icon} />
				</IconButton>
				<IconButton className={styles.button}>
					<SettingsIcon className={styles.icon} />
				</IconButton>
				<IconButton className={styles.button}>
					<FullscreenIcon className={styles.icon} />
				</IconButton>
			</div>
		</div>
	);
};
