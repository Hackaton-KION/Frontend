import { CircularProgress } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { FilmPlayer } from '@/widgets/films';
import { MainLayout } from '@/shared/ui';
import { filmModel, pageModel } from './model';

import styles from './page.module.css';

const Film: React.FC = () => {
	const film = useUnit(filmModel.query);

	return (
		<MainLayout className={styles.layout}>
			{/* {film.data ? ( */}
			<FilmPlayer
				className={styles.player}
				manifestURL='http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd'
				// {...film.data}
			/>
			{/* ) : (
				<CircularProgress size={80} color='secondary'/>
			)} */}
		</MainLayout>
	);
};

pageModel.loaded();

export default Film;
