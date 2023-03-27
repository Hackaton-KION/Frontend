import * as React from 'react';
import { VideoAccessability } from '@/features/film';
import { MainLayout, VideoPlayer } from '@/shared/ui';

import styles from './page.module.css';

const Film: React.FC = () => {
	const [filter, setFilter] = React.useState<string>('');

	return (
		<MainLayout className={styles.layout}>
			<VideoPlayer
				className={styles.player}
				url='http://10.147.19.65:5000/static/segments/cs2_2/cs2_2.mpd'
				// url='http://10.147.19.65:5000/static/segments/cs2_1/cs2_1.mpd'
				// url='http://10.147.19.65:5000/static/segments/video/video.mpd'
				filter={filter}
				extraControls={<VideoAccessability setFilter={setFilter} />}
			/>
		</MainLayout>
	);
};

export default Film;
