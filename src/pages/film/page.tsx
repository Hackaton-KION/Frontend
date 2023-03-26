/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import * as React from 'react';
import { VideoAccessability } from '@/features/film';
import { MainLayout } from '@/shared/ui';

import { NEW_VideoPlayer } from '@/shared/ui/video-player-new';
import styles from './page.module.css';

const modules: string[] = [
	VideoAccessability.ShakaUIElementName,
	'mute',
	'volume',
	'time_and_duration',
	'fullscreen',
	'overflow_menu'
];

const Film: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
			<NEW_VideoPlayer controlPanelElements={modules} url='' preview='' />
		</MainLayout>
	);
};

export default Film;
