import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './header.module.css';

export interface HeaderProps extends CommonProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { className, } = props;

	return (
		<div className={cn(styles.container, className)}>
			<Typography className={styles.title} variant='h3' component='p'>
				Сердце пармы
			</Typography>
		</div>
	);
};
