import cn from 'classnames';
import * as React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import { CommonProps } from '@/shared/types';
import { useSketch, useStyledCanvas } from './lib';

import styles from './video.module.css';

export interface VideoProps extends CommonProps {
	readonly videoStyles?: React.CSSProperties | null;
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
	(props, ref) => {
		const { className, videoStyles, } = props;
		const { sketch, canvasRef, } = useSketch({
			ref,
		});
		useStyledCanvas({
			className: styles.video,
			styles: videoStyles,
			canvasRef,
		});

		return (
			<div className={cn(styles.container, className)}>
				<ReactP5Wrapper sketch={sketch} />
			</div>
		);
	}
);
