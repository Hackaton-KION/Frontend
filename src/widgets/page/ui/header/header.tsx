import { AppBar, Container, Toolbar } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Navigation } from '@/features/page';
import { CommonProps } from '@/shared/types';
import { Logo } from '@/shared/ui';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, } = props;

	return (
		<AppBar
			className={cn(styles.wrapper, className)}
			position='static'
			color='transparent'>
			<Toolbar>
				<Container className={styles.container}>
					<Logo className={styles.logo} />
					<Navigation className={styles.navigation} />
				</Container>
			</Toolbar>
		</AppBar>
	);
};
