import * as React from 'react';
import { MainLayout, VideoPlayer } from '@/shared/ui';

import styles from './page.module.css';

const Film: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
			<VideoPlayer
				className={styles.player}
				// url='https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
				url='http://10.147.19.65:5000/segments/manifest.mpd'
			/>
		</MainLayout>
	);
};

export default Film;
