import { Element, Renderer } from 'p5';
import * as React from 'react';
import { P5CanvasInstance } from 'react-p5-wrapper';

export interface UseSketchParams {
	readonly ref: React.ForwardedRef<HTMLVideoElement>;
}

export const useSketch = (params: UseSketchParams) => {
	const { ref, } = params;

	const canvasRef = React.useRef<null | Renderer>(null);
	const videoRef = React.useRef<null | Element>(null);

	const sketch = React.useCallback((p5: P5CanvasInstance) => {
		p5.setup = () => {
			if (canvasRef.current) {
				return;
			}
			canvasRef.current = p5.createCanvas(
				window.innerWidth,
				window.innerHeight
			);
			if (videoRef.current) {
				return;
			}

			videoRef.current = p5.createCapture('video');
			const { width, height, } = canvasRef.current.size();
			videoRef.current.size(width, height);

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

			videoRef.current.hide();
			videoRef.current.removeAttribute('playsinline');
		};

		p5.draw = () => {
			if (!videoRef.current || !videoRef.current.elt.src) {
				return;
			}
			p5.tint(255, 255, 255);
			p5.image(videoRef.current, 0, 0);
		};

		p5.windowResized = () => {
			p5.resizeCanvas(window.innerWidth, window.innerHeight, true);
			videoRef.current!.size(window.innerWidth, window.innerHeight);
		};
	}, []);

	return {
		sketch,
		videoRef,
		canvasRef,
	};
};
