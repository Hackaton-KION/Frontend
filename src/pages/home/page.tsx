import { Paper, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { Header } from '@/widgets/page';
import { LoginForm } from '@/features/auth';
import { Logo, MainLayout } from '@/shared/ui';

import styles from './page.module.css';

const Home: React.FC = () => {
	return (
		<MainLayout className={styles.layout} header={<Header />}>
			<Paper className={styles.wrapper} variant='outlined'>
				<div className={styles.top}>
					<Logo className={styles.logo} />
					<Typography className={styles.title} variant='h5' component='p'>
						Авторизация
					</Typography>
				</div>
				<LoginForm />
				<Typography className={styles.bottom} variant='h5' component='p'>
					Нет аккаунта KION?
					<Typography
						className={styles.link}
						to='/registration'
						component={Link}>
						Зарегистрироваться
					</Typography>
				</Typography>
			</Paper>
		</MainLayout>
	);
};

export default Home;
