import { useEffect } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

export interface UseUIConfigParams {
	readonly player: globalThis.shaka.Player | null;
	readonly videoContainer: HTMLElement | null;
	readonly video: HTMLVideoElement | null;
	readonly config: Partial<globalThis.shaka.extern.UIConfiguration>;
}

export const useUIConfig = (params: UseUIConfigParams) => {
	const { config, player, video, videoContainer, } = params;

	useEffect(() => {
		if (!player || !video || !videoContainer) {
			return;
		}

		const ui: globalThis.shaka.ui.Overlay = new shaka.ui.Overlay(
			player,
			videoContainer,
			video
		);
		ui.configure(config);
		ui.getControls();

		return () => {
			ui.destroy();
		};
	}, [config, player, video, videoContainer]);
};
