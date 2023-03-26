import * as React from 'react';
import { MainLayout, VideoPlayer } from '@/shared/ui';

import styles from './page.module.css';

const Film: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
			<VideoPlayer />
		</MainLayout>
	);
};

export default Film;
