import * as React from 'react';
import { FilmPlayer } from '@/widgets/films';
import { MainLayout } from '@/shared/ui';

import styles from './page.module.css';

const Film: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
			<FilmPlayer
				className={styles.player}
				url='http://10.147.19.65:5000/static/segments/cs2_2/cs2_2.mpd'
			/>
		</MainLayout>
	);
};

export default Film;
