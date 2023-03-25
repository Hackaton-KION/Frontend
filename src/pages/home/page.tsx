import * as React from 'react';
import { PromoSlider } from '@/widgets/films';
import { Header } from '@/widgets/page';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

import styles from './page.module.css';

const Home: React.FC = () => {
	return (
		<MainLayout className={styles.layout} header={<Header />}>
			<PromoSlider />
		</MainLayout>
	);
};

pageModel.loaded();

export default Home;
