/* eslint-disable jsx-a11y/media-has-caption */

import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './video.module.css';

export interface VideoProps extends CommonProps {}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
	(props, ref) => {
		const { className, } = props;

		return (
			<div className={cn(styles.container, className)}>
				<video className={styles.video} ref={ref} />
			</div>
		);
	}
);
