import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { parseTime } from '../../lib';
import { VideoPlayerStateContext } from '../../model';

import styles from './timeline.module.css';

export interface TimelineProps extends CommonProps {}

export const Timeline: React.FC<TimelineProps> = (props) => {
	const { className, } = props;
	const { progress, videoRef, } = React.useContext(VideoPlayerStateContext);

	const { duration, currentTime, } = videoRef.current! || {
		duration: 0,
		currentTime: 0,
	};
	const currentTimeParsed = parseTime(currentTime);
	const durationParsed = parseTime(duration);

	return (
		<div className={cn(styles.container, className)}>
			<div className={styles.timeBar}>
				<div
					className={styles.timeBar_progress}
					style={{ width: `${progress}%`, }}
				/>
			</div>
			<Typography
				className={cn(styles.time, styles.progressTime)}
				variant='body2'
				component='span'>
				{currentTimeParsed !== '' ? currentTimeParsed : '00:00:00'}/
			</Typography>
			<Typography
				className={cn(styles.time, styles.allTime)}
				variant='body2'
				component='span'>
				{durationParsed !== '' ? durationParsed : '00:00:00'}
			</Typography>
		</div>
	);
};
