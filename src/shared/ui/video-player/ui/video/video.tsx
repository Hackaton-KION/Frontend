/* eslint-disable jsx-a11y/media-has-caption */

import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './video.module.css';
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { Element, Renderer } from 'p5';

export interface VideoProps extends CommonProps {
	readonly videoStyles?: React.CSSProperties | null;
	readonly id: number;
	readonly title: string;
}

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
	(props, ref) => {
		const { className, videoStyles, id, title } = props;

		const sketch = React.useCallback(
			(p5: P5CanvasInstance) => {
				let video: Element;
				let canvas: Renderer;
				p5.setup = () => {
					canvas = p5.createCanvas(320, 240);
					p5.background(51);
					console.log('video');
					video = p5.createCapture('video');
					// video.attribute('src', '/video.mp4');
					canvas.elt.addEventListener('click', () => {
						video.elt.paused ? video.elt.play() : video.elt.pause();
					});

					video.hide();
					video.attribute('volume', '0.1');
					video.attribute('id', `${id}_${title}`);
					video.size(320, 240);
				};

				p5.draw = () => {
					// p5.tint(255, 0, 150);
					p5.image(video, 0, 0);
					console.log(videoStyles?.filter, canvas);
					canvas.style('filter', videoStyles!.filter);
				};
				console.log('sketch');
			},
			[id, title, videoStyles]
		);

		return (
			<div className={cn(styles.container, className)}>
				<ReactP5Wrapper sketch={sketch} />;
				<video
					className={styles.video}
					ref={ref}
					style={videoStyles ?? undefined}
					style={{ position: 'static' }}
				/>
			</div>
		);
	}
);
