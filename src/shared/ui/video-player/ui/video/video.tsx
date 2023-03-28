/* eslint-disable jsx-a11y/media-has-caption */

import cn from 'classnames';
import { Element, Renderer } from 'p5';
import * as React from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from 'react-p5-wrapper';
import { CommonProps } from '@/shared/types';

import styles from './video.module.css';

export interface VideoProps extends CommonProps {
	readonly videoStyles?: React.CSSProperties | null;
	readonly id: number;
	readonly title: string;
}

type VideoElement = Element & { elt: HTMLVideoElement };

export const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
	(props, ref) => {
		const { className, videoStyles, id, title, } = props;
		const canvasRef = React.useRef<null | Renderer>(null);
		const videoRef = React.useRef<null | VideoElement>(null);

		const sketch = React.useCallback(
			(p5: P5CanvasInstance) => {
				p5.setup = () => {
					if (canvasRef.current) {
						return;
					}
					canvasRef.current = p5.createCanvas(
						window.innerWidth,
						window.innerHeight
					);
					videoRef.current = p5.createCapture('video') as VideoElement;
					switch (typeof ref) {
						case 'undefined':
							break;
						case 'object':
							if (ref !== null) {
								ref.current = videoRef.current.elt as HTMLVideoElement;
							}
							break;
						case 'function':
							ref(videoRef.current.elt);
							break;
						default:
							break;
					}

					(videoRef.current.elt as HTMLVideoElement).playsInline = false;
					videoRef.current.attribute('src', '/video.mp4');
					canvasRef.current.elt.addEventListener('click', () => {
						const video = videoRef.current!.elt as HTMLVideoElement;
						if (video.paused) {
							video.play();
							return;
						}
						video.pause();
					});

					videoRef.current.hide();
					videoRef.current.attribute('volume', '0.1');
					videoRef.current.removeAttribute('playsinline');
				};

				p5.draw = () => {
					if (!videoRef.current || !videoRef.current.elt.src) {
						return;
					}
					p5.tint(255, 0, 255);
					p5.image(videoRef.current, 0, 0);
					// p5.
					// canvasRef.current.style('filter', videoStyles!.filter);
				};
			},
			[id, title]
		);

		return (
			<div className={cn(styles.container, className)}>
				<ReactP5Wrapper sketch={sketch} />
				<video
					className={styles.video}
					// ref={ref}
					style={videoStyles ?? undefined}
					// eslint-disable-next-line react/jsx-no-duplicate-props
					style={{ position: 'static', }}
				/>
			</div>
		);
	}
);
