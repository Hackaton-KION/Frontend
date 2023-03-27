import * as React from 'react';
import { FilmPlayer } from '@/widgets/films';
import { MainLayout } from '@/shared/ui';
import { filmModel, pageModel } from './model';

import styles from './page.module.css';
import { useUnit } from 'effector-react';
import { CircularProgress } from '@mui/material';

const Film: React.FC = () => {
	const film = useUnit(filmModel.query);

	return (
		<MainLayout className={styles.layout}>
			{film.data ? (
				<FilmPlayer
					className={styles.player}
					{...film.data}
				/>
			) : (
				<CircularProgress />
			)}
		</MainLayout>
	);
};

pageModel.loaded();

export default Film;
