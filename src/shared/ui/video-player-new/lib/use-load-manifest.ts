import { useEffect } from 'react';
import { useToggle } from '@/shared/lib';

export const useLoadManifest = (
	player: globalThis.shaka.Player | null,
	url: string
) => {
	const [isLoading, loadingControls] = useToggle(false);
	const [isError, errorControls] = useToggle();
	const [isSuccess, successControls] = useToggle();

	useEffect(() => {
		if (!player) {
			return;
		}

		loadingControls.toggleOn();
		player
			.load(url)
			.then(() => {
				successControls.toggleOn();
			})
			.catch(() => {
				errorControls.toggleOn();
			})
			.finally(() => {
				loadingControls.toggleOff();
			});

		return () => {
			loadingControls.toggleOff();
			errorControls.toggleOff();
			successControls.toggleOff();
		};
	}, [player, url]);

	return {
		isLoading,
		isError,
		isSuccess,
	};
};
