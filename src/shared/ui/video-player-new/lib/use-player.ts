import { useEffect, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

export const usePlayer = (video: HTMLVideoElement | null) => {
	const [player, setPlayer] = useState<globalThis.shaka.Player | null>(null);

	useEffect(() => {
		if (!video) {
			setPlayer(null);
			return;
		}
		setPlayer(new shaka.Player(video));

		return () => {
			player?.destroy();
		};
	}, [video]);

	return player;
};
