import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import { Logo, MainLayout } from '@/shared/ui';

import styles from './page.module.css';
import { LoginForm } from '@/features/auth';

const Login: React.FC = () => {
	return (
		<MainLayout className={styles.layout}>
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
					<Typography to='/registration' component={Link}>
						Зарегистрироваться
					</Typography>
				</Typography>
			</Paper>
		</MainLayout>
	);
};

export default Login;
